export const muatations = `#graphql
    createTweet(payload: CreateTweetData!): Tweet
    updateTweet(id:String!,imageURL:String,content:String):Tweet
`;
