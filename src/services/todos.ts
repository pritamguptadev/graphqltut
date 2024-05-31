import { prismaClient } from "../DB/lib/db"

export interface CreateTodoPayload{
    content:string,
    imageURL?:string,
    userId:string
}

export class TodoService{
    public static async createTodo(payload:CreateTodoPayload){
        const {content,imageURL,userId}=payload
        const todo=await prismaClient.todos.create({
            data:{
                content:content,
                imageURL:imageURL?imageURL:"",
                auther:{connect:{id:userId}}

            }
            
        })
        console.log(todo,"glkldsldklkwee");
        
        return todo
    }
}