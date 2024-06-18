import { UserEntity } from "../../entities/users";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories/user.repository";

export interface FindByEmailUserUseCase {
    execute(email: string): Promise<UserEntity | CustomError>
}

export class FindByEmailUser implements FindByEmailUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ){}

    execute(email: string): Promise<UserEntity | CustomError> {
        return this.repository.findOneByEmail(email);
    }

}
