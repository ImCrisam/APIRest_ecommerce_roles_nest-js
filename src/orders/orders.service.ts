import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException(`User ${dto.userId} not found`);

    const items: OrderItem[] = [];
    let total = 0;

    for (const i of dto.items) {
      const product = await this.productRepo.findOne({
        where: { id: i.productId },
      });
      if (!product)
        throw new NotFoundException(`Product ${i.productId} not found`);

      if (product.stock < i.quantity) {
        throw new BadRequestException(`Not enough stock for ${product.name}`);
      }

      const item = this.orderItemRepo.create({
        product,
        quantity: i.quantity,
        price: product.price,
      });

      items.push(item);
      total += product.price * i.quantity;

      // stock
      product.stock -= i.quantity;
      await this.productRepo.save(product);
    }

    const order = this.orderRepo.create({
      user,
      items,
      totalAmount: total,
      status: 'creado',
    });

    return this.orderRepo.save(order);
  }

  findAll(paginationDto: PaginationDto): Promise<Order[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.orderRepo.find({
      take: limit,
      skip: offset,
      relations: ['user', 'items', 'items.product'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product'],
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return this.orderRepo.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
  }
}
