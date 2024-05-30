"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql
type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String
    }
   
`;
exports.default = typeDefs;
