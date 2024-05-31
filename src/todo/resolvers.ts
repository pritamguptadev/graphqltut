import { CreateTodoPayload, TodoService } from "../services/todos";

const queries={
    getAllUserTodos:async(_:any,{},ctx:any)=>{
        // console.log(ctx,"gggggggg");
        if(!ctx)throw new Error("user to auth")
        const todos=await TodoService.getAllUserTodos(ctx.id);
        console.log(todos,"gggggggdddd");
        return todos
        
        
    }

}
const mutations = {
    createTweet: async (
      parent: any,
      { payload }: { payload: CreateTodoPayload },
      ctx:any
    ) => {
      if (!ctx.user) throw new Error("You are not authenticated");
      const tweet = await TodoService.createTodo({
        ...payload,
        userId: ctx.user.id,
      });
  
      return tweet;
    },
    updateTweet:async(_:any,{id,imageURL,content}:{id:string,imageURL:string,content:string},ctx:any)=>{
        if(!ctx.user) throw new Error("you are not authenicated")
            const todos=await TodoService.updateTweet(id,imageURL,content)
        console.log(todos,"llllllll");
        
    }
  };

  export const resolvers = { mutations, queries };

