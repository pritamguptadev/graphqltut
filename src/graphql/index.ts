import {ApolloServer} from "@apollo/server";
import { prismaClient } from "../DB/lib/db";

export async function createApolloGraphqlServer(){
    const gqlServer=new ApolloServer({
        typeDefs:`
        type Query {
            hello:String,
            say(name:String):String
        }
       type Mutation {
        createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean

        }`,
        resolvers:{
            Query:{
                hello:()=>'hey there i am a graphql server ',
                say:(_,{name}:{name:String})=>`hey there ${name}, How are you`
            },
            Mutation:{
                createUser:async(_,{firstName,lastName,email,password}:{firstName:string,lastName:string,email:string,password:string})=>{
                    await prismaClient.userData.create({
                        data:{
                            email,
                            firstName,
                            lastName,
                            password
                        }
                    })
                }
            }
        }
    })
    await gqlServer.start();
    return gqlServer
}

