import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from 'src/users/users.model';

interface PostsCreationAttrs {
  title: string;
  content: string;
  userId: string;
  image: string;
}

@Table({ tableName: 'posts' })
export class Posts extends Model<Posts, PostsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UserModel)
  autor: UserModel[];
}
