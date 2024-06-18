import { Metadata } from "./common/metadata.interface";

export interface IUser {
    id?: number;
    typeDocument: string;
    document: string;
    fullName: string;
    email: string;
    password?: string;
    role: string;
    createUserAt?: string | null,
    createDateAt?: Date | null,
    updateUserAt?: string | null,
    updateDateAt?: Date | null,
    token?: string;
}

export interface IUserNoToken {
    id?: number;
    typeDocument: string;
    document: string;
    fullName: string;
    email: string;
    password?: string;
    role: string;
    createUserAt?: string | null,
    createDateAt?: Date | null,
    updateUserAt?: string | null,
    updateDateAt?: Date | null,
}

export interface IUserPaginated {
    users: IUserNoToken[],
    metadata?: Metadata,
}