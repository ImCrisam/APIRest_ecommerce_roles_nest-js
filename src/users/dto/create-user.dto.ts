import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, MinLength, IsEnum } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {

  @ApiProperty({ example: 'Cristian' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Arias' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'cristian@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: UserRole.CLIENT, enum: UserRole, required: false })
  @IsEnum(UserRole)
  role?: UserRole;

}
