import { CreateTodoPayload, TodoService } from "../services/todos";

const queries={
    
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
  };

  export const resolvers = { mutations, queries };

