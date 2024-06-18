import { BcryptAdapter } from "../../config/bcryptjs.adapter";
import { prisma } from "../../db/mysql";

import { UserDataSource } from "../../domain/datasources/user.datasource";
import { PaginationDto } from "../../domain/dtos/common/pagination.dto";
import { RegisterUserDto } from "../../domain/dtos/users/register-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";
import { UserEntity } from "../../domain/entities/users";
import { CustomError } from "../../domain/errors/custom.error";
import { ExecuteMetadataPagination } from "../../domain/utils/pagination.response";

import { IUser, IUserPaginated } from "../../interfaces/user.interface";

export class UserDataSourceImpl implements UserDataSource {

    async create(registerUserDto: RegisterUserDto): Promise<UserEntity | CustomError> {

        const existUser = await prisma.tBL_USUARIO.findMany({
            where: {
                OR: [
                    { document: registerUserDto.document },
                    { email: registerUserDto.email }
                ]
            }
        });

        if( existUser.length > 0 ) return CustomError.badRequestError("Ya existe el email o el documento");

        const bcrypt = new BcryptAdapter();

        const newUser = await prisma.tBL_USUARIO.create({
            data: {
                typeDocument: registerUserDto.typeDocument,
                document: registerUserDto.document,
                fullName: registerUserDto.fullName,
                email: registerUserDto.email.toLowerCase().trim(),
                password:  bcrypt.hash(registerUserDto.password),
                role: "USER",
                createUserAt: "123456789",
                createDateAt: new Date(),
            }
        });

        return newUser;

    }

    async findOne(id: number): Promise<UserEntity | CustomError> {
        
        const getUser = await prisma.tBL_USUARIO.findFirst({ where: { id } });

        if( !getUser ) 
            return CustomError.badRequestError("No fue encontrado el usuario con el ID proporcionado");

        return getUser;

    }

    async findOneByEmail(email: string): Promise<UserEntity | CustomError> {
        
        const searchFilterLower = email.toLowerCase().trim();
        const getUser = await prisma.tBL_USUARIO.findFirst({ where: { email: searchFilterLower } });

        if( !getUser ) 
            return CustomError.badRequestError("No fue encontrado el usuario con el email proporcionado");

        return getUser;
        
    }

    async findAll(paginationDto: PaginationDto): Promise<CustomError | IUserPaginated | null> {
        
        const { page, limit, search } = paginationDto;
        let getUsers: IUser[] = [];
        let getUsersCore: IUser[] = [];
        let countData: number;

        try {

            if( search && search !== "" && search !== null && search !== undefined  ){

                getUsers = await prisma.$queryRaw`
                    SELECT id, typeDocument, document, fullName, email, role, status
                    FROM tBL_USUARIO
                    WHERE status = true AND (
                        LOWER(fullName) LIKE CONCAT('%', LOWER(${search}), '%') OR
                        LOWER(document) LIKE CONCAT('%', LOWER(${search}), '%') OR
                        LOWER(email) LIKE CONCAT('%', LOWER(${search}), '%')
                    )
                    LIMIT ${limit} OFFSET ${(page - 1) * limit};
                `;

                getUsersCore = getUsers as IUser[]
                const getCount = await prisma.$queryRaw`
                    SELECT id, typeDocument, document, fullName, email, role, status
                    FROM tBL_USUARIO
                    WHERE status = true AND (
                        LOWER(fullName) LIKE CONCAT('%', LOWER(${search}), '%') OR
                        LOWER(document) LIKE CONCAT('%', LOWER(${search}), '%') OR
                        LOWER(email) LIKE CONCAT('%', LOWER(${search}), '%')
                    )
                `;
                countData = Array(getCount).length;

            }else{

                getUsers = await prisma.tBL_USUARIO.findMany({
                    take: limit,
                    skip: Number(page - 1) * limit,
                    where: { status: true },
                    select: {
                        id: true,
                        typeDocument: true,
                        document: true,
                        fullName: true,
                        email: true,
                        role: true,
                        status: true,
                    }
                });

                getUsersCore = getUsers as IUser[]
                countData = await prisma.tBL_USUARIO.count({})

            }

            const metadata = ExecuteMetadataPagination( countData, page, limit );

            return {
                users: getUsersCore,
                metadata
            }
            
        } catch (error) {

            throw CustomError.internalServerError("Error Interno del Servidor");

        } finally {

            await prisma.$disconnect();
            
        } 
        
    }

    async update(updateUserDto: UpdateUserDto): Promise<UserEntity | CustomError> {
        
        const getUser = await this.findOne(Number(updateUserDto.id));

        if( !getUser ) 
            return CustomError.badRequestError("No fue encontrado el usuario con el ID proporcionado");

        //Verifiquemos a nivel de documento
        const getDocumento = await prisma.tBL_USUARIO.findFirst({
            where: { document: updateUserDto.document }
        });

        if( getDocumento && getDocumento.id != updateUserDto.id )
            return CustomError.badRequestError("El documento ya existe en el sistema");

        //Verifiquemos a nivel de usuario
        const getEmail = await prisma.tBL_USUARIO.findFirst({
            where: { email: updateUserDto.email }
        });

        if( getEmail && getEmail.id != updateUserDto.id )
            return CustomError.badRequestError("El documento ya existe en el sistema");

        //Podemos actualizar entonces
        const updateUser = await prisma.tBL_USUARIO.update({
            where: { id: updateUserDto.id },
            data: {
                updateUserAt: "123456789",
                updateDateAt: new Date(),
                ...updateUserDto
            }
        })

        return updateUser;
        
    }

    async dalete(id: number): Promise<UserEntity | CustomError> {
        
        const getUser = await this.findOne(id);

        if( !getUser || getUser instanceof CustomError ) 
            return CustomError.badRequestError("No fue encontrado el usuario con el ID proporcionado");

        const updateUser = await prisma.tBL_USUARIO.update({
            where: { id },
            data: {
                status: false
            }
        })

        return updateUser;
        
    }

}
