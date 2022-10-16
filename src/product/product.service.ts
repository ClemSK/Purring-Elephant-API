import { Injectable } from '@nestjs/common';
import ProductsRepository from './product.repository';
import ProductDto from './product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductsRepository) {}

  getProducts() {
    console.log('getProducts:product.service');
    return this.productRepository.getAll();
  }

  getProductById(id: number) {
    return this.productRepository.getById(id);
  }

  createProduct(productData: ProductDto) {
    return this.productRepository.create(productData);
  }

  updateProduct(id: number, productData: ProductDto) {
    return this.productRepository.update(id, productData);
  }

  deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }
}
