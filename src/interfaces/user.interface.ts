export default interface IUser {
    fullName: string;
    email: string;
    password: string;
    age: number;
    nationality: string;
    role: string
}

export interface IUserWithId extends IUser {
    _id?: string;
    id?: string;
}