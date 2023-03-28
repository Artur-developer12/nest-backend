import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';

@Module({
  providers: [RolesController],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, Users, UsersModule])],
})
export class RolesModule {}
