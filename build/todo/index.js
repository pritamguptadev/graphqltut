"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const types_1 = require("./types");
const query_1 = require("./query");
const muatation_1 = require("./muatation");
const resolvers_1 = require("./resolvers");
exports.Tweet = { types: types_1.types, muatations: muatation_1.muatations, resolvers: resolvers_1.resolvers, queries: query_1.queries };
