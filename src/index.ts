import express from "express";
import {expressMiddleware} from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { prismaClient } from "./DB/lib/db";
import { createApolloGraphqlServer } from "./graphql";


async function init() {
    const app=express();
    const PORT=8000;
    app.use(express.json());
   
    // await gqlServer.start();
    app.get("/",(req,res)=>{
        res.json({message:"server is running"})
    })  

    app.use("/graphql",expressMiddleware(await createApolloGraphqlServer()))  
    app.listen(PORT,()=>{
        console.log("running on 8000");
        
    })
}

init()