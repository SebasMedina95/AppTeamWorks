import { IUserPaginated } from "../../interfaces/user.interface";
import { PaginationDto } from "../dtos/common/pagination.dto";
import { RegisterUserDto } from "../dtos/users/register-user.dto";
import { UpdateUserDto } from "../dtos/users/update-user.dto";

import { UserEntity } from "../entities/users";
import { CustomError } from "../errors/custom.error";

export abstract class UserRepository {

    abstract create(registerUserDto: RegisterUserDto): Promise<UserEntity | CustomError>;
    abstract findOne(id: number): Promise<UserEntity | CustomError>;
    abstract findOneByEmail(email: string): Promise<UserEntity | CustomError>;
    abstract findAll(paginationDto: PaginationDto): Promise<IUserPaginated | CustomError | null>;
    abstract update(updateUserDto: UpdateUserDto): Promise<UserEntity | CustomError>;
    abstract dalete(id: number): Promise<UserEntity | CustomError>;

}
