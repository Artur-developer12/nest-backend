import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Posts } from 'src/posts/post.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles-model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users', modelName: 'UsersTable' })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
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
  banned: boolean;
  @ApiProperty({ example: 'За хулиганство', description: 'Причина бана' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Posts)
  post: Posts[];
}
