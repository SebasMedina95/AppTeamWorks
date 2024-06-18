import { UserEntity } from "../../entities/users";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories/user.repository";

export interface DeleteUserUseCase {
    execute(id: number): Promise<UserEntity | CustomError>
}

export class DeleteUser implements DeleteUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ){}

    execute(id: number): Promise<UserEntity | CustomError> {
        return this.repository.dalete(id);
    }

}
