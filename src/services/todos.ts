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
    public static async getAllUserTodos(id:string){
        const todos=prismaClient.todos.findMany({where:{id}})
        console.log(todos,"sare todos");
        return todos;
        
    }
    public static async updateTweet(id:string,content?:string,imageURL?:string){
        const todo=await prismaClient.todos.update({where:{id},data:{content,imageURL}})
        return todo
        
    }
    public static async deleteTweet(id:string){
        const todo=await prismaClient.todos.delete({where:{id}})
        return todo;
    }
}
