"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query = `#graphql
 hello:String,
say(name:String):String
getUserToken(email:String!,password:String!):String
getloggedInUser:User
getUserLoggedOut:String
`;
exports.default = Query;
