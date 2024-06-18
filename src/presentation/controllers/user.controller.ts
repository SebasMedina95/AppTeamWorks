import { Request, Response } from 'express';
import { UserRepository } from "../../domain/repositories/user.repository";
import { RegisterUserDto } from '../../domain/dtos/users/register-user.dto';
import { ApiResponse } from '../../domain/utils/api-response';
import { UserEntity } from '../../domain/entities/users';
import { CustomError } from '../../domain/errors/custom.error';
import { EResponseCodes } from '../../constants/api-codes';

export class UserController {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    public create = async(req: Request, res: Response): Promise<Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined> => {

        const [error, registerDto] = RegisterUserDto.registerUser(req.body);
        if ( error ) {
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar registrar un usuario")
            )
            return;
        }

        const createUser = await this.userRepository.create(registerDto!);

        if( createUser instanceof CustomError ){
            return res.status(createUser.statusCode).json(
                new ApiResponse({error: createUser.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar registrar un usuario"))
        }

        return res.status(201).json(new ApiResponse(createUser, EResponseCodes.OK, "Usuario Registrado"));

    }

    public findOne(req: Request, res: Response): any {

    }

    public findAll(req: Request, res: Response): any {

    }

    public update(req: Request, res: Response): any {

    }

    public dalete(req: Request, res: Response): any {

    }

}
