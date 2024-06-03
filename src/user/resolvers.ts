import { UserData } from "@prisma/client";
import { prismaClient } from "../DB/lib/db"
import { CreateUserPayload, UserServices } from "../services/user"
import { uploader } from "../services/imageuploader";


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
            await uploader(payload.imageUrl)
            return res.id
        },
        followUser:async(_:any,{to}:{to:string},ctx:any)=>{
            const res= await UserServices.followUser(ctx.user.id,to)
            console.log(res,"jlkaskjriepfjdlkv");
            return res
            
        }
    }

const extraResolvers={
    User:{
        tweets:async(parent:any)=>{
          let data= await prismaClient.todos.findMany({where:{authorId:parent.id}})
          return data
        }
    }
}


export const resolvers={Query,Mutation,extraResolvers}