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
exports.TodoService = void 0;
const db_1 = require("../DB/lib/db");
class TodoService {
    static createTodo(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, imageURL, userId } = payload;
            const todo = yield db_1.prismaClient.todos.create({
                data: {
                    content: content,
                    imageURL: imageURL ? imageURL : "",
                    auther: { connect: { id: userId } }
                }
            });
            console.log(todo, "glkldsldklkwee");
            return todo;
        });
    }
}
exports.TodoService = TodoService;
