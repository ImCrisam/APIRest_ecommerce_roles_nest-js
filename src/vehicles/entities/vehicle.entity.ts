import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @ApiProperty({ example: 'c788d198-dfdd-4e09-b8ec-1ad48000fb43' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Toyota' })
  @Column()
  make: string; // Marca (ej: Toyota)

  @ApiProperty({ example: 'Corolla' })
  @Column()
  model: string; // Modelo (ej: Corolla)

  @ApiProperty({ example: 2022 })
  @Column()
  year: number;

  @ApiProperty({ example: '2025-09-13T21:42:24.905Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-13T21:42:24.905Z' })
  @UpdateDateColumn()
  updatedAt: Date;

//   // Relación inversa (solo tendrá sentido cuando tengamos Product)
//   @OneToMany(() => Product, (product) => product.vehicle)
//   products: Product[];
}
