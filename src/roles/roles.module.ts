import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/users/users.model';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { UserRoles } from './user-roles-model';

@Module({
  providers: [RolesController],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, UserModel, UserRoles])],
})
export class RolesModule {}
