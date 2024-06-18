import { UserDataSource } from "../../domain/datasources/user.datasource";
import { PaginationDto } from "../../domain/dtos/common/pagination.dto";
import { RegisterUserDto } from "../../domain/dtos/users/register-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";
import { UserEntity } from "../../domain/entities/users";
import { CustomError } from "../../domain/errors/custom.error";
import { UserRepository } from "../../domain/repositories/user.repository";
import { IUserPaginated } from "../../interfaces/user.interface";

export class UserRepositoryImpl implements UserRepository {

    constructor(
        private readonly datasource: UserDataSource
    ){}
    
    create(registerUserDto: RegisterUserDto): Promise<UserEntity | CustomError> {       
        return this.datasource.create(registerUserDto);
    }

    findOne(id: number): Promise<UserEntity | CustomError> {
        return this.datasource.findOne(id);
    }

    findAll(paginationDto: PaginationDto): Promise<CustomError | IUserPaginated | null> {
        return this.datasource.findAll(paginationDto);
    }

    update(updateUserDto: UpdateUserDto): Promise<UserEntity | CustomError> {
        return this.datasource.update(updateUserDto);
    }

    dalete(id: number): Promise<UserEntity | CustomError> {
        return this.datasource.dalete(id);
    }

}
