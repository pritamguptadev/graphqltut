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
const db_1 = require("../DB/lib/db");
function createApolloGraphqlServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const gqlServer = new server_1.ApolloServer({
            typeDefs: `
        type Query {
            hello:String,
            say(name:String):String
        }
       type Mutation {
        createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean

        }`,
            resolvers: {
                Query: {
                    hello: () => 'hey there i am a graphql server ',
                    say: (_, { name }) => `hey there ${name}, How are you`
                },
                Mutation: {
                    createUser: (_1, _a) => __awaiter(this, [_1, _a], void 0, function* (_, { firstName, lastName, email, password }) {
                        yield db_1.prismaClient.userData.create({
                            data: {
                                email,
                                firstName,
                                lastName,
                                password
                            }
                        });
                    })
                }
            }
        });
        yield gqlServer.start();
        return gqlServer;
    });
}
exports.createApolloGraphqlServer = createApolloGraphqlServer;
