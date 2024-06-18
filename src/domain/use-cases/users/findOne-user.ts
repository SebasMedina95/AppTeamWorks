import { UserEntity } from "../../entities/users";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories/user.repository";

export interface FindByIdUserUseCase {
    execute(id: number): Promise<UserEntity | CustomError>
}

export class FindByIdUser implements FindByIdUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ){}

    execute(id: number): Promise<UserEntity | CustomError> {
        return this.repository.findOne(id);
    }

}
