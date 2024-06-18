import { regularExps } from "../../../presentation/validations/regular-exp";

export class UpdateUserDto {

    constructor(
        public readonly id: number,
        public readonly typeDocument: string,
        public readonly document: string,
        public readonly email: string,
        public readonly fullName: string,
        public readonly status: boolean,
        public readonly createUserAt?: string,
        public readonly createDateAt?: Date,
        public readonly updateUserAt?: string,
        public readonly updateDateAt?: Date,
    ){}

    static updateUser( object: { [key:string]: any } ): [string?, UpdateUserDto?] {

        const {
            id,
            typeDocument,
            document,
            email,
            fullName,
            status,
            createUserAt,
            createDateAt,
            updateUserAt,
            updateDateAt,
        } = object;

        //* ********************************** *//
        //* *********** Validación *********** *//
        //* ********************************** *//
        const validRoles: string[] = ['USER','SUPER_USER','ADMIN'];

        //Id
        if( !id ) return ['El ID a actualizar es Requerido', undefined];

        //Tipo de Documento
        if( !typeDocument ) return ['Tipo de Documento es Requerido', undefined];

        //Documento
        if( !document ) return [`Número de Documento es requerido`, undefined];
        if( !regularExps.document.test(document) ) return [`Número de documento no es valido`, undefined];

        //Email
        if( !email ) return ['Email es requerido', undefined];
        if( !regularExps.email.test(email) ) return [`Email no valido`, undefined];

        //Nombre Completo
        if( !fullName ) return [`Nombre Completo es requerido`];
        if( !regularExps.names.test(fullName) ) return [`Nombre Completo no es valido`, undefined];

        return [undefined, new UpdateUserDto(
            id,
            typeDocument,
            document,
            email,
            fullName,
            status,
            createUserAt,
            createDateAt,
            updateUserAt,
            updateDateAt,
        )];

    }

}
