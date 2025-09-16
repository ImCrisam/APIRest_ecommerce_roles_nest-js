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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { IdParamDto } from '../common/dtos/idParam.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully.',
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 'f72a4c3b-21f5-4b37-8e91-02bdf203ac7a',
  })
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param() params: IdParamDto) {
    return this.productsService.findOne(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({
    name: 'id',
    example: 'f72a4c3b-21f5-4b37-8e91-02bdf203ac7a',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, type: Product })
  update(@Param() params: IdParamDto, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(params.id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a product by ID' })
  @ApiParam({
    name: 'id',
    example: 'f72a4c3b-21f5-4b37-8e91-02bdf203ac7a',
  })
  @ApiResponse({ status: 200, type: Product })
  remove(@Param() params: IdParamDto) {
    return this.productsService.remove(params.id);
  }
}
