import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Order } from "../../orders/entities/order.entity";

export enum UserRole {
  CLIENT = 'cliente',
  ADMIN = 'administrador',
}

@Entity()
export class User {
  @ApiProperty({ example: 'd54e4d29-64d8-4a29-83bb-2138d3c93b4f' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Andres' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Arias' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'cristian@mail.com' })
  @Column({ unique: true })
  email: string;


  @ApiProperty({ example: 'hashedpassword123' })
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ example: UserRole.CLIENT, enum: UserRole })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @ApiProperty({ example: '2025-09-13T21:42:24.905Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-13T21:42:24.905Z' })
  @UpdateDateColumn()
  updatedAt: Date;


  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    // this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    // Solo volver a hashear si cambió
    if (this.password) {
      // this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
