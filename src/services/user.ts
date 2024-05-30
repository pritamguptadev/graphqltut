import jwt from "jsonwebtoken";
import bcrpyt from "bcryptjs";
import { prismaClient } from "../DB/lib/db";




export interface CreateUserPayload{
    firstName:string;
    lastName?:string;
    email:string;
    password:string;
}
export interface loginCred{
    email:string;
    password:string;
}

export class UserServices{
    private static jwtSecrt="kddlkfdf"
    public static async createUser(payload:CreateUserPayload){
        const {firstName,lastName,email,password}=payload;
       let hashed=await UserServices.createHashedPassword(password)
       return  prismaClient.userData.create({
            data:{
                firstName,
                email,
                lastName:lastName?lastName:"",
                password:hashed
            }
        })


    }
    public static async genrateUserToken(payload:loginCred){
        const {email,password}=payload;
       let data= await UserServices.getUser(email)
       
       
       if(!data){
            throw new Error("user does not exist")
       }
       let passRes=await UserServices.compareHashedPass(password,data.password);
    //    console.log("service data",data,passRes);
       if(!passRes){
         throw new Error("cred invalid");
       }
       let res=await UserServices.genrateJWTToken(data.id,data.email);
       return res




    }
    public static async createHashedPassword(pass:string):Promise<any>{
        let hashed=await bcrpyt.hash(pass,8);
        return hashed
    }
    private static async getUser(email:string):Promise<any>{
        let data=await prismaClient.userData.findUnique({where:{email}})
       return data
    }
    private static async compareHashedPass(pass:string,hased:string):Promise<any>{
        return await bcrpyt.compare(pass,hased)
       
    }
    private static async genrateJWTToken(id:string,email:string):Promise<any>{
        return await jwt.sign({id,email},UserServices.jwtSecrt,{expiresIn:"5d"})
       
    }
    public static async decodeToken(pass:string):Promise<any>{
        let res=await jwt.verify(pass,UserServices.jwtSecrt);
        return res
    }


    
}