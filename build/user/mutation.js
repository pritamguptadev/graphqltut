"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mutation = `#graphql
createUser(firstName:String!,lastName:String!,email:String!,password:String!):String
followUser(to:String!):Boolean

`;
exports.default = Mutation;
