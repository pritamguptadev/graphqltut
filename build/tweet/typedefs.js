"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql

input CreateTodoData {
    content: String!
    ImageURL:String
}
type todo {
        id: ID!
        content: String!
        ImageURL: String
        author : User
    }
   
`;
exports.default = typeDefs;
