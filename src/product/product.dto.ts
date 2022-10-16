import { IsString, IsNotEmpty, IsInt, Min, Max, Length } from 'class-validator';

// DTO means data transfer object

class ProductDto {
  @IsInt()
  @Min(0)
  @Max(100000)
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsInt()
  @Min(0)
  @Max(10000)
  @IsNotEmpty()
  price: number;

  @IsInt()
  @Min(0)
  @Max(10000)
  @IsNotEmpty()
  stock: number;
}

export default ProductDto;
