import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateVehicleDto {
  
  @ApiProperty({ description: 'Marca del vehículo', example: 'Toyota' })
  @IsString()
  make: string;

  @ApiProperty({ description: 'Modelo del vehículo', example: 'Corolla' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'Año del vehículo', example: 2022 })
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number;
}
