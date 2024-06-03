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
const db_1 = require("../DB/lib/db");
const user_1 = require("../services/user");
const imageuploader_1 = require("../services/imageuploader");
const Query = {
    hello: () => 'hey there i am a graphql server ',
    say: (_, { name }) => `hey there ${name}, How are you`,
    getUserToken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.UserServices.genrateUserToken(payload);
    }),
    getloggedInUser: (_, pay, context) => {
        if (!context) {
            return new Error("i dont know you");
        }
        return context.user;
    },
    getUserLoggedOut: (_, pay, context) => {
        context = "";
        return "logged out ";
    }
};
const Mutation = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_1.UserServices.createUser(payload);
        yield (0, imageuploader_1.uploader)(payload.imageUrl);
        return res.id;
    }),
    followUser: (_1, _a, ctx_1) => __awaiter(void 0, [_1, _a, ctx_1], void 0, function* (_, { to }, ctx) {
        const res = yield user_1.UserServices.followUser(ctx.user.id, to);
        console.log(res, "jlkaskjriepfjdlkv");
        return res;
    })
};
const extraResolvers = {
    User: {
        tweets: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            let data = yield db_1.prismaClient.todos.findMany({ where: { authorId: parent.id } });
            return data;
        })
    }
};
exports.resolvers = { Query, Mutation, extraResolvers };
