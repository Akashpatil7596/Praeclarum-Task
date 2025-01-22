import { HttpException, HttpStatus } from '@nestjs/common';

export function handleException(error) {
  if (error instanceof HttpException) {
    throw error;
  }

  throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
}

export function response(message: string, statusCode: number, data: any = {}) {
  return {
    message,
    statusCode,
    data,
  };
}
