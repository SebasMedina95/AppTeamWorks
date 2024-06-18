import { Request, Response } from 'express';

import { UserRepository } from '../src/domain/repositories/user.repository';
import { ApiResponse } from '../src/domain/utils/api-response';
import { UserEntity } from '../src/domain/entities/users';
import { CustomError } from '../src/domain/errors/custom.error';
import { RegisterUserDto } from '../src/domain/dtos/users/register-user.dto';
import { EResponseCodes } from '../src/constants/api-codes';
import { SearchUserByIdDto } from '../src/domain/dtos/users/search-id-user.dto';
import { SearchUserByEmailDto } from '../src/domain/dtos/users/search-email-user.dto';
import { PaginationDto } from '../src/domain/dtos/common/pagination.dto';
import { UpdateUserDto } from '../src/domain/dtos/users/update-user.dto';
import { IUserPaginated } from '../src/interfaces/user.interface';

//? ******************************************************************************** ?//
//? ******************************************************************************** ?//
//? *** ASÍ NOS HABÍA QUEDADO EL CONTROLADOR ANTES DE APLICAR LOS CASOS DE USO  ***  ?//
//? *** SE CONSERVARÁ UNA COPIA DE SEGURIDAD PARA TENER DE REFERENCIA COMO SE   ***  ?//
//? *** SE VEÍA ANTES DE MODIFICAR EL CONTROLADOR PARA QUE CONSUMA LOS CASOS    ***  ?//
//? *** DE USO -> DE ESTA MANERA QUEDARÁ IMPLEMENTADA MÁS EN FORMA LA DDD       ***  ?//
//? ******************************************************************************** ?//
//? ******************************************************************************** ?//

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

    public findOne = async(req: Request, res: Response): Promise<Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined> => {

        const { id } = req.params;
        const [error, searchDto] = SearchUserByIdDto.searchUserById( Number(id) );

        if( error ){
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar el ID")
            )
            return;
        }

        const getUser = await this.userRepository.findOne(Number(id)!);

        if( getUser instanceof CustomError ){
            return res.status(getUser.statusCode).json(
                new ApiResponse({error: getUser.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar un usuario"))
        }

        return res.status(200).json(new ApiResponse(getUser, EResponseCodes.OK, "Obteniendo usuario por ID"));

    }

    public findOneByEmail = async(req: Request, res: Response): Promise<Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined> => {

        const { email } = req.body;

        const [error, searchDto] = SearchUserByEmailDto.searchUserByEmail( email );

        if( error ){
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar el Email")
            )
            return;
        }

        const getUser = await this.userRepository.findOneByEmail(email!);

        if( getUser instanceof CustomError ){
            return res.status(getUser.statusCode).json(
                new ApiResponse({error: getUser.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar un usuario"))
        }

        return res.status(200).json(new ApiResponse(getUser, EResponseCodes.OK, "Obteniendo usuario por Email"));

    }

    public findAll = async(req: Request, res: Response): Promise<Response<ApiResponse<IUserPaginated | CustomError | undefined>, Record<string, any>> | undefined> => {

        const { page , limit , search = "" } = req.body;
        const [error, paginationDto] = PaginationDto.pagination( Number(page), Number(limit), search.toString() );

        if( error ){
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar paginar los usuarios")
            )
            return;
        }

        const getUsersPaginated = await this.userRepository.findAll(paginationDto!);

        if( getUsersPaginated instanceof CustomError ){
            return res.status(getUsersPaginated.statusCode).json(
                new ApiResponse({error: getUsersPaginated.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar usuarios con paginación"))
        }

        return res.status(200).json(new ApiResponse(getUsersPaginated, EResponseCodes.OK, "Obteniendo usuarios paginados"));

    }

    public update = async(req: Request, res: Response): Promise<Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined> => {

        const [error, updateUserDto] = UpdateUserDto.updateUser(req.body);
        if ( error ) {
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar actualizar un usuario")
            )
            return;
        }

        const updateUser = await this.userRepository.update(updateUserDto!);

        if( updateUser instanceof CustomError ){
            return res.status(updateUser.statusCode).json(
                new ApiResponse({error: updateUser.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar actualizar un usuario"))
        }

        return res.status(200).json(new ApiResponse(updateUser, EResponseCodes.OK, "Usuario Actualizado"));

    }

    public dalete = async(req: Request, res: Response): Promise<Response<ApiResponse<UserEntity | CustomError>, Record<string, any>> | undefined> => {

        const { id } = req.params;
        const [error, searchDto] = SearchUserByIdDto.searchUserById( Number(id) );

        if( error ){
            res.status(400).json(
                new ApiResponse({error}, EResponseCodes.FAIL, "Ocurrió un error al intentar encontrar el ID")
            )
            return;
        }

        const deleteUser = await this.userRepository.dalete(Number(id)!);

        if( deleteUser instanceof CustomError ){
            return res.status(deleteUser.statusCode).json(
                new ApiResponse({error: deleteUser.message}, EResponseCodes.FAIL, "Ocurrió un error al intentar eliminar un usuario"))
        }

        return res.status(200).json(new ApiResponse(deleteUser, EResponseCodes.OK, "Usuario Eliminado Lógicamente"));

    }

}
