import { Request, Response } from 'express';

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserEntity } from '../../domain/entities/users';
import { IUserPaginated } from '../../interfaces/user.interface';

import { ApiResponse } from '../../domain/utils/api-response';
import { CustomError } from '../../domain/errors/custom.error';
import { EResponseCodes } from '../../constants/api-codes';

//Dto's de trabajo
import { RegisterUserDto } from '../../domain/dtos/users/register-user.dto';
import { UpdateUserDto } from '../../domain/dtos/users/update-user.dto';
import { SearchUserByIdDto } from '../../domain/dtos/users/search-id-user.dto';
import { PaginationDto } from '../../domain/dtos/common/pagination.dto';
import { SearchUserByEmailDto } from '../../domain/dtos/users/search-email-user.dto';

//Casos de uso
import { CreateUser } from '../../domain/use-cases/users/create-user';
import { FindByIdUser } from '../../domain/use-cases/users/findOne-user';
import { FindByEmailUser } from '../../domain/use-cases/users/findByEmail-user';
import { FindAllPaginatedUser } from '../../domain/use-cases/users/findAll-user';
import { UpdateUser } from '../../domain/use-cases/users/update-user';
import { DeleteUser } from '../../domain/use-cases/users/delete-user';

export class UserController {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    public create = (req: Request, res: Response): Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined => {
        
        const [error, registerDto] = RegisterUserDto.registerUser(req.body);
        if ( error ) {
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar registrar un usuario")
            )
            return;
        }

        new CreateUser( this.userRepository )
            .execute(registerDto!)
            .then( user => {

                if( user instanceof CustomError ){
                    return res.status(user.statusCode).json(
                        new ApiResponse({error: user.message}, EResponseCodes.FAIL, "No se pudor registrar el usuario"))
                }

                return res.status(201).json(new ApiResponse(user, EResponseCodes.OK, "Usuario Registrado"));

            })
            .catch( error => {
                return res.status(400).json(
                    new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar registrar un usuario")
                )
            })

    }

    public findOne = (req: Request, res: Response): Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined => {

        const { id } = req.params;
        const [error, searchDto] = SearchUserByIdDto.searchUserById( Number(id) );

        if( error ){
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar el ID")
            )
            return;
        }

        new FindByIdUser( this.userRepository )
            .execute(Number(id)!)
            .then( user => {

                if( user instanceof CustomError ){
                    return res.status(user.statusCode).json(
                        new ApiResponse({error: user.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar un usuario"))
                }

                return res.status(200).json(new ApiResponse(user, EResponseCodes.OK, "Obteniendo usuario por ID"));

            })
            .catch( error => {
                return res.status(400).json(
                    new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar obtener un usuario por ID")
                )
            })

    }

    public findOneByEmail = (req: Request, res: Response): Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined => {

        const { email } = req.body;
        const [error, searchDto] = SearchUserByEmailDto.searchUserByEmail( email );

        if( error ){
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar el Email")
            )
            return;
        }

        new FindByEmailUser( this.userRepository )
            .execute( email )
            .then( user => {

                if( user instanceof CustomError ){
                    return res.status(user.statusCode).json(
                        new ApiResponse({error: user.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar un usuario"))
                }

                return res.status(200).json(new ApiResponse(user, EResponseCodes.OK, "Obteniendo usuario por Email"));

            })
            .catch( error => {
                return res.status(400).json(
                    new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar obtener un usuario por Email")
                )
            })

    }

    public findAll = (req: Request, res: Response): Response<ApiResponse<IUserPaginated | CustomError | undefined>, Record<string, any>> | undefined => {

        const { page , limit , search = "" } = req.body;
        const [error, paginationDto] = PaginationDto.pagination( Number(page), Number(limit), search.toString() );

        if( error ){
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar paginar los usuarios")
            )
            return;
        }

        new FindAllPaginatedUser( this.userRepository )
            .execute( paginationDto! )
            .then( users => {

                if( users instanceof CustomError ){
                    return res.status(users.statusCode).json(
                        new ApiResponse({error: users.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar usuarios con paginación"))
                }

                return res.status(200).json(new ApiResponse(users, EResponseCodes.OK, "Obteniendo usuarios paginados"));

            })
            .catch( error => {
                return res.status(400).json(
                    new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar obtener listado paginado y filtrado de usuarios")
                )
            })

    }

    public update = (req: Request, res: Response): Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined => {

        const [error, updateUserDto] = UpdateUserDto.updateUser(req.body);
        if ( error ) {
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar actualizar un usuario")
            )
            return;
        }

        new UpdateUser( this.userRepository )
            .execute( updateUserDto! )
            .then( user => {

                if( user instanceof CustomError ){
                    return res.status(user.statusCode).json(
                        new ApiResponse({error: user.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar actualizar un usuario"))
                }

                return res.status(200).json(new ApiResponse(user, EResponseCodes.OK, "Usuario Actualizado"));

            })
            .catch( error => {
                return res.status(400).json(
                    new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar actualizar el usuario")
                )
            })

    }

    public dalete = (req: Request, res: Response): Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined => {

        const { id } = req.params;
        const [error, searchDto] = SearchUserByIdDto.searchUserById( Number(id) );

        if( error ){
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar el ID")
            )
            return;
        }

        new DeleteUser( this.userRepository )
            .execute( Number(id) )
            .then( user => {

                if( user instanceof CustomError ){
                    return res.status(user.statusCode).json(
                        new ApiResponse({error: user.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar eliminar un usuario"))
                }

                return res.status(200).json(new ApiResponse(user, EResponseCodes.OK, "Usuario Eliminado"));

            })
            .catch( error => {
                return res.status(400).json(
                    new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar eliminar lógicamente el usuario")
                )
            })

    }

}
