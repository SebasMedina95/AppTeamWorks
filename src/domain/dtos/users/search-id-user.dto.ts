
export class SearchUserByIdDto {

    private constructor(
        public readonly id: number,
    ){}

    static searchUserById( id: number ): [string?, SearchUserByIdDto?] {

        //Id
        if( !id ) return ['El Id es requerido para la busqueda', undefined];
        if( isNaN(Number(id)) ) return ['Id de busqueda inválido', undefined];

        return [undefined, new SearchUserByIdDto( id )];

    }

}