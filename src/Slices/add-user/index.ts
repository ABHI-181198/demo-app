// export interface IAddUserParameter{
//     firstName: string,
//     lastName:string,
//     mobileNumber:string,
//     email: string,
//     gender: string,
//     panNumber: string,
//     passportNumber: string,
//     dateOfBirth: string,
//     dateoFJoining: string,
//     profileImage: any,
// }

export interface IGetAddedUserValue{
    message:string,
    id:number,
}

export interface IAddUserState{
    success:boolean,
    message:string,
    data:IGetAddedUserValue[]|any,
    loading:string,
}