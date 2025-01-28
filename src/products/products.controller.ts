import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, ParseIntPipe, Query, Put } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductListDto } from './dto/products-list.dto';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Req() req, @Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(req.user, createProductDto);
  }

  @Get()
  async getProductList(@Query() query: ProductListDto) {
    return await this.productService.getProductList(query);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProductById(id);
  }

  @Put(':id')
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.removeProduct(id);
  }
}
