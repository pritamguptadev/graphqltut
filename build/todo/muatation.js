"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.muatations = void 0;
exports.muatations = `#graphql
    createTweet(payload: CreateTweetData!): Tweet
    updateTweet(id:String!,imageURL:String,content:String):Tweet
`;
