
export class UserEntity {

    constructor(
        public readonly id: number,
        public readonly typeDocument: string,
        public readonly document: string,
        public readonly fullName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string,
        public readonly status: boolean
    ){}

    static fromObject( object: { [key : string]: any } ){

        const {
            id,
            typeDocument,
            document,
            fullName,
            email,
            password,
            role,
            status,
        } = object;

        return new UserEntity( 
            id,
            typeDocument,
            document,
            fullName,
            email,
            password,
            role,
            status,
         )

    }

}
