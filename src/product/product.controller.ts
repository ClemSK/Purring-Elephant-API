import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import FindOneParams from '../utils/findOneParams';
import ProductDto from './product.dto';

@Controller('products')
export default class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getProducts() {
    console.log('getProducts:product.controller');
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param() { id }: FindOneParams) {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  updateProduct(@Param() { id }: FindOneParams, @Body() postData: ProductDto) {
    return this.productsService.updateProduct(id, postData);
  }

  @Post()
  createProduct(@Body() postData: ProductDto) {
    return this.productsService.createProduct(postData);
  }

  @Delete(':id')
  deleteProduct(@Param() { id }: FindOneParams) {
    return this.productsService.deleteProduct(id);
  }
}
