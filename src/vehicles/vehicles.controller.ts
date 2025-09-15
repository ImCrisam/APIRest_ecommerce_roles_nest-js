import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { Vehicle } from './entities/vehicle.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { IdParamDto } from '../common/dtos/idParam.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiBody({ type: CreateVehicleDto })
  @ApiResponse({ 
    status: 201,
    description: 'Vehicle created successfully.',
    type:Vehicle
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
    @ApiResponse({ 
    status: 200,
    type:[Vehicle]
  })
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({ status: 200, description: 'List of vehicles.' })
  findAll(@Query() paginationDto:PaginationDto) {
    return this.vehiclesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by ID' })
  @ApiParam({ name: 'id', description: 'Vehicle ID', example: "d8f619d2-43ff-433f-8245-3e5083747134" })
  @ApiResponse({ status: 200, type:Vehicle })
  @ApiProperty({
    description: 'description',
    example: 'd8f619d2-43ff-433f-8245-3e5083747134',
  })
  findOne(@Param() params: IdParamDto) {
    return this.vehiclesService.findOne(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vehicle by ID' })
  @ApiParam({ name: 'id', example: "d8f619d2-43ff-433f-8245-3e5083747134" })
  @ApiBody({ type: UpdateVehicleDto })
  @ApiResponse({ status: 200, type:Vehicle })
  update(@Param() params: IdParamDto, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(params.id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a vehicle by ID' })
  @ApiParam({ name: 'id', example: "d8f619d2-43ff-433f-8245-3e5083747134" })
  @ApiResponse({ status: 200, type:Vehicle })
  remove(@Param() params: IdParamDto) {
    return this.vehiclesService.remove(params.id);
  }
}
