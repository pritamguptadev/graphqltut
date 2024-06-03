import jwt from "jsonwebtoken";
import bcrpyt from "bcryptjs";
import { prismaClient } from "../DB/lib/db";
import { uploader } from "./imageuploader";




export interface CreateUserPayload{
    firstName:string;
    lastName?:string;
    email:string;
    password:string;
    imageUrl?:any
}
export interface loginCred{
    email:string;
    password:string;
}

export class UserServices{
    private static jwtSecrt="kddlkfdf"
    public static async createUser(payload:CreateUserPayload){
        const {firstName,lastName,email,password,imageUrl}=payload;
       let hashed=await UserServices.createHashedPassword(password)
       let data:any= await uploader("/Users/pritam/desktop/download.jpeg")
        //    console.log(data,"kjhgfdsytrebvcgfd");
       return  prismaClient.userData.create({
            data:{
                firstName,
                email,
                lastName:lastName?lastName:"",
                password:hashed,
                profileImage:data?.secure_url
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
        return await jwt.sign({id,email},UserServices.jwtSecrt)
       
    }
    public static async decodeToken(pass:string):Promise<any>{
        let res=await jwt.verify(pass,UserServices.jwtSecrt);
        
        return res
    }
    public static async followUser(from:string,to:string):Promise<any>{
        let res=await prismaClient.follows.create({data: {
            follower: { connect: { id: from } },
            following: { connect: { id: to } },
          }})
          return res
    }
    public static async unfollowUser(from:string,to:string):Promise<any>{
        let res=await prismaClient.follows.delete({where: {
            followerId_followingId:{followerId:from,followingId:to}
          }})
          return res
    }


    
}