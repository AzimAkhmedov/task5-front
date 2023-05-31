export interface IUser {
    email: string
    fullname: string
    number: string
    address: string
    id: string

}
export interface IState {
    users: Array<IUser>
    loader: boolean
    error?: boolean | string
}