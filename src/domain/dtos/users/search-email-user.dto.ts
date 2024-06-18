
export class SearchUserByEmailDto {

    private constructor(
        public readonly email: string,
    ){}

    static searchUserByEmail( email: string ): [string?, SearchUserByEmailDto?] {

        //Id
        if( !email ) return ['El email es requerido para la busqueda', undefined];

        return [undefined, new SearchUserByEmailDto( email )];

    }

}