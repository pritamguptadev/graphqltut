"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const todos_1 = require("../services/todos");
const queries = {
    getAllUserTodos: (_1, _a, ctx_1) => __awaiter(void 0, [_1, _a, ctx_1], void 0, function* (_, {}, ctx) {
        // console.log(ctx,"gggggggg");
        if (!ctx)
            throw new Error("user to auth");
        const todos = yield todos_1.TodoService.getAllUserTodos(ctx.id);
        console.log(todos, "gggggggdddd");
        return todos;
    }),
    deletetweet: (_2, _b, ctx_2) => __awaiter(void 0, [_2, _b, ctx_2], void 0, function* (_, { id }, ctx) {
        if (!ctx.user)
            throw new Error("user are not authenticated");
        const todo = yield todos_1.TodoService.deleteTweet(id);
        // console.log(todo);
        return todo;
    })
};
const mutations = {
    createTweet: (parent_1, _c, ctx_3) => __awaiter(void 0, [parent_1, _c, ctx_3], void 0, function* (parent, { payload }, ctx) {
        if (!ctx.user)
            throw new Error("You are not authenticated");
        const tweet = yield todos_1.TodoService.createTodo(Object.assign(Object.assign({}, payload), { userId: ctx.user.id }));
        return tweet;
    }),
    updateTweet: (_3, _d, ctx_4) => __awaiter(void 0, [_3, _d, ctx_4], void 0, function* (_, { id, imageURL, content }, ctx) {
        if (!ctx.user)
            throw new Error("you are not authenicated");
        const todos = yield todos_1.TodoService.updateTweet(id, imageURL, content);
        console.log(todos, "llllllll");
    })
};
exports.resolvers = { mutations, queries };
