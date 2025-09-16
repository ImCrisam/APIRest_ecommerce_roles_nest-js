import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt, IsUrl, IsUUID, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Llantas Michelin Pilot Sport 4' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Neumáticos de alto rendimiento para autos deportivos' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 450.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  stock: number;

  @ApiProperty({ example: 'MICHELIN-PS4-205/55R16' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 'https://example.com/images/ps4.jpg' })
  @IsUrl()
  imageUrl: string;

  @ApiProperty({ example: 'c788d198-dfdd-4e09-b8ec-1ad48000fb43' })
  @IsOptional()
  @IsUUID()
  vehicleId: string;
}
