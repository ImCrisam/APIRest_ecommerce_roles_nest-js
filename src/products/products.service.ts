import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    // private readonly VehiclesRepo: Repository<Vehicle>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    // if (dto.vehicleId) {
    //   const vehicle = await this.VehiclesRepo.findOne({
    //     where: { id: dto.vehicleId },
    //   });
    //   if (!vehicle)
    //     throw new NotFoundException(`Vehicle ${dto.vehicleId} not found`);
    // }
    const product = this.productsRepo.create(dto);
    return this.productsRepo.save(product);
  }

  async findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.productsRepo.find({
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
      relations:{
        vehicle:true
      }
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepo.preload({ id, ...dto });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return this.productsRepo.save(product);
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);
    return this.productsRepo.remove(product);
  }
}
