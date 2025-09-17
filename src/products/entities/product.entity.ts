import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity()
export class Product {
  @ApiProperty({ example: 'f72a4c3b-21f5-4b37-8e91-02bdf203ac7a' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Llantas Michelin Pilot Sport 4' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Neumáticos de alto rendimiento para autos deportivos',
  })
  @Column()
  description: string;

  @ApiProperty({ example: 450.99 })
  @Column('decimal')
  price: number;

  @ApiProperty({ example: 20 })
  @Column('int')
  stock: number;

  @ApiProperty({ example: 'MICHELIN-PS4-205/55R16' })
  @Column({ unique: true })
  sku: string;

  @ApiProperty({ example: 'https://example.com/images/ps4.jpg' })
  @Column()
  imageUrl: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.products, {
    onDelete: 'CASCADE',
    nullable: true,
    eager:true,
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle?: Vehicle;
  
  vehicleId?: string;

  @ApiProperty({ example: '2025-09-15T18:10:24.905Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-15T18:10:24.905Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
