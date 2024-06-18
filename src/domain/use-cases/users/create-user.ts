import { UserEntity } from "../../entities/users";
import { CustomError } from "../../errors/custom.error";
import { RegisterUserDto } from "../../dtos/users/register-user.dto";
import { UserRepository } from "../../repositories/user.repository";

export interface CreateUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserEntity | CustomError>
}

export class CreateUser implements CreateUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ){}

    execute(registerUserDto: RegisterUserDto): Promise<UserEntity | CustomError> {
        return this.repository.create(registerUserDto);
    }

}
