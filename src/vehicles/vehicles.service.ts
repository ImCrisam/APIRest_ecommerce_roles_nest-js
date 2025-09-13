import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {

   constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    const vehicle = this.vehicleRepo.create(createVehicleDto);
    return this.vehicleRepo.save(vehicle);
  }

  findAll() {
    return this.vehicleRepo.find();
  }

  async findOne(id: string) {
    const vehicle = await this.vehicleRepo.findOne({ where: { id } });
    if (!vehicle) throw new NotFoundException(`Vehicle ${id} not found`);
    return vehicle;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
