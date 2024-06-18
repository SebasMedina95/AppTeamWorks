import { UserEntity } from "../../entities/users";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories/user.repository";
import { UpdateUserDto } from "../../dtos/users/update-user.dto";

export interface UpdateUserUseCase {
    execute(updateUserDto: UpdateUserDto): Promise<UserEntity | CustomError>
}

export class UpdateUser implements UpdateUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ){}

    execute(updateUserDto: UpdateUserDto): Promise<UserEntity | CustomError> {
        return this.repository.update(updateUserDto);
    }

}
