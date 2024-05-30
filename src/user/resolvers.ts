import { prismaClient } from "../DB/lib/db"
import { CreateUserPayload, UserServices } from "../services/user"


const Query={
    hello:()=>'hey there i am a graphql server ',
    say:(_:any,{name}:{name:String})=>`hey there ${name}, How are you`,
    getUserToken:async(_:any,payload:{email:string,password:string})=>{
        return await UserServices.genrateUserToken(payload);
    },
    getloggedInUser:(_:any,pay:any,context:any)=>{
        if(!context){
           return new Error("i dont know you")
        }
        return context.user
        
    },
    getUserLoggedOut:(_:any,pay:any,context:any)=>{
         context="";
         return "logged out "
    }

}
const Mutation={
        createUser:async(_:any,payload:CreateUserPayload)=>{
            const res=await UserServices.createUser(payload)
            return res.id
        }
    }


export const resolvers={Query,Mutation}