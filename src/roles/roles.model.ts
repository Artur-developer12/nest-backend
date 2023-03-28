import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserModel } from 'src/users/users.model';
import { UserRoles } from './user-roles-model';

interface RolesCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RolesCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;
  @ApiProperty({
    example: 'Admin',
    description: 'Уникальное Значение роли пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;
  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => UserModel, () => UserRoles)
  users: UserModel[];
}
