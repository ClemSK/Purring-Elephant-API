import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { plainToInstance } from 'class-transformer';
import ProductModel from './product.model';
import ProductDto from './product.dto';
// import { ProductService } from './product.service';

@Injectable()
class ProductsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    console.log('getAll:product.repository');
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM products;
    `);
    // return databaseResponse.rows;
    return plainToInstance(ProductModel, databaseResponse.rows);
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
        SELECT * FROM products WHERE id=$1
      `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(ProductModel, entity);
  }

  async create(productData: ProductDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
        INSERT INTO products (
          name,
          price,
          stock
        ) VALUES (
          $1,
          $2,
          $3
        ) RETURNING *
      `,
      [productData.name, productData.price, productData.stock],
    );
    return plainToInstance(ProductModel, databaseResponse.rows[0]);
  }

  async update(id: number, productData: ProductDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
        UPDATE products
        SET name = $2, price = $3, stock = $4
        WHERE id = $1
        RETURNING *
      `,
      [id, productData.name, productData.price, productData.stock],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(ProductModel, entity);
  }

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `DELETE FROM products WHERE id=$1`,
      [id],
    );
    if (databaseResponse.rowCount === 0) {
      throw new NotFoundException();
    }
  }
}

export default ProductsRepository;
