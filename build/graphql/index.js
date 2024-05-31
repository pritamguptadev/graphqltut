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
exports.createApolloGraphqlServer = void 0;
const server_1 = require("@apollo/server");
const user_1 = require("../user");
const todo_1 = require("../todo");
// console.log(User);
function createApolloGraphqlServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const gqlServer = new server_1.ApolloServer({
            typeDefs: `
            ${user_1.User.typeDefs}
            ${todo_1.Tweet.types}
           
           
            
        type Query {
           ${user_1.User.Query}
           ${todo_1.Tweet.queries}
         
           
        }
       type Mutation {
            ${user_1.User.Mutation}
            ${todo_1.Tweet.muatations}
        
        }`,
            resolvers: {
                Query: Object.assign(Object.assign({}, user_1.User.resolvers.Query), todo_1.Tweet.resolvers.queries),
                Mutation: Object.assign(Object.assign({}, user_1.User.resolvers.Mutation), todo_1.Tweet.resolvers.mutations)
            }
        });
        yield gqlServer.start();
        return gqlServer;
    });
}
exports.createApolloGraphqlServer = createApolloGraphqlServer;
