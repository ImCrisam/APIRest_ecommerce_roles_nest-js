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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string; // Marca (ej: Toyota)

  @Column()
  model: string; // Modelo (ej: Corolla)

  @ApiProperty({
    description: 'description',
    example: 200
  })
  @Column()
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

//   // Relación inversa (solo tendrá sentido cuando tengamos Product)
//   @OneToMany(() => Product, (product) => product.vehicle)
//   products: Product[];
}
