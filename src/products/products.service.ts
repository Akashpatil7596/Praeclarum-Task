import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { handleException } from 'src/helper/response';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/models/products';
import { DeepPartial, Repository } from 'typeorm';
import { User } from 'src/models/users';
import { ProductListDto } from './dto/products-list.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Products) private readonly productRepository: Repository<Products>) {}

  async createProduct(user: { id: number }, createProductDto: CreateProductDto) {
    try {
      const productData: DeepPartial<Products> = {
        ...createProductDto,
        user: { id: user.id } as User,
      };

      const newProduct = this.productRepository.create(productData);

      const storeProduct = await this.productRepository.save(newProduct);

      if (storeProduct) {
        return storeProduct;
      } else {
        throw new HttpException('Error while creating', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log('products.service.ts | createProduct | error | line:32', error);
      handleException(error);
    }
  }

  async getProductById(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!product || !product.id) {
        throw new HttpException('Product does not exists', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Product detail fetched successfully',
        data: product,
      };
    } catch (error) {
      console.log('products.service.ts | getProductById | error | line:53', error);
      handleException(error);
    }
  }

  async getProductList(query: ProductListDto) {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;

      const skip = (page - 1) * limit;

      const queryBuilder = this.productRepository.createQueryBuilder('product');

      queryBuilder.leftJoinAndSelect('product.user', 'user');

      if (query.search) {
        queryBuilder.andWhere('product.name LIKE :search', { search: `%${query.search}%` });
      }

      if (query.sortBy && query.sortOrder) {
        queryBuilder.orderBy(`product.${query.sortBy}`, query.sortOrder as 'ASC' | 'DESC');
      }

      const productList = await queryBuilder.skip(skip).take(limit).getMany();

      return {
        limit,
        page,
        totalCount: productList.length,
        data: productList,
      };
    } catch (error) {
      console.log('products.service.ts | getProductList | error | line:86', error);
      handleException(error);
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product || !product.id) {
        throw new HttpException('Product does not exists', HttpStatus.NOT_FOUND);
      }

      const updatedProduct = await this.productRepository.update(id, updateProductDto);

      if (updatedProduct.affected && updatedProduct.affected > 0) {
        const product = await this.productRepository.findOne({
          where: { id },
          relations: ['user'],
        });

        return {
          message: 'Product updated successfully',
          data: product,
        };
      } else {
        throw new HttpException('Error while updating', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log('products.service.ts | updateProduct | error | line:117', error);
      handleException(error);
    }
  }

  async removeProduct(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product || !product.id) {
        throw new HttpException('Product does not exists', HttpStatus.NOT_FOUND);
      }

      const deletedProduct = await this.productRepository.delete(id);

      if (deletedProduct.affected && deletedProduct.affected > 0) {
        return {
          message: 'Product deleted successfully',
        };
      } else {
        throw new HttpException('Error while deleting', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log('products.service.ts | removeProduct | error | line:142', error);
      handleException(error);
    }
  }
}
