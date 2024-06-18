import { regularExps } from "../../../presentation/validations/regular-exp";

export class RegisterUserDto {

    constructor(
        public readonly typeDocument: string,
        public readonly document: string,
        public readonly fullName: string,
        public readonly email: string,
        public readonly password: string
    ){}

    static registerUser( object: { [key:string]: any } ): [string?, RegisterUserDto?] {

        const {
            typeDocument,
            document,
            fullName,
            email,
            password
        } = object;

        //* ********************************** *//
        //* *********** Validación *********** *//
        //* ********************************** *//
        const validRoles: string[] = ['USER','SUPER_USER','ADMIN'];

        //Tipo de Documento
        if( !typeDocument ) return ['Tipo de Documento es Requerido', undefined];

        //Documento
        if( !document ) return [`Número de Documento es requerido`, undefined];
        if( !regularExps.document.test(document) ) return [`Número de documento no es valido`, undefined];

        //Nombre Completo
        if( !fullName ) return [`Nombre Completo es requerido`];
        if( !regularExps.names.test(fullName) ) return [`Nombre Completo no es valido`, undefined];

        //Email
        if( !email ) return ['Email es requerido', undefined];
        if( !regularExps.email.test(email) ) return [`Email no valido`, undefined];

        //Password
        if( !password ) return [`Password es requerido`];
        if( !regularExps.password.test(password) ) return [`Password debe tener al menos 6 caracteres, contener una mayúscula, una minúscula y un caracter esopecial [!@#$%^&*._]`];

        return [undefined, new RegisterUserDto(
            typeDocument,
            document,
            fullName,
            email,
            password
        )];

    }

}
