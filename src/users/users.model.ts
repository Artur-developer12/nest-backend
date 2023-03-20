import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;
  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый ящик' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @ApiProperty({ example: 'qwerty', description: 'Пароль' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @ApiProperty({ example: true, description: 'Забанен или нет' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: string;
  @ApiProperty({ example: 'За хулиганство', description: 'Причина бана' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;
}
