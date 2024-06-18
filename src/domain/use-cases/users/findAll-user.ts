import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories/user.repository";
import { PaginationDto } from "../../dtos/common/pagination.dto";
import { IUserPaginated } from "../../../interfaces/user.interface";

export interface FindAllPaginatedUserUseCase {
    execute(paginationDto: PaginationDto): Promise<IUserPaginated | CustomError | null>
}

export class FindAllPaginatedUser implements FindAllPaginatedUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ){}

    execute(paginationDto: PaginationDto): Promise<IUserPaginated | CustomError | null> {
        return this.repository.findAll(paginationDto);
    }

}
