"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mutation_1 = __importDefault(require("./mutation"));
const queries_1 = __importDefault(require("./queries"));
const resolvers_1 = require("./resolvers");
const types_1 = __importDefault(require("./types"));
exports.User = { Mutation: mutation_1.default, Query: queries_1.default, resolvers: resolvers_1.resolvers, typeDefs: types_1.default };
