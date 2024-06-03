const typeDefs=`#graphql
type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String
        tweets: [Tweet]
        followers:[User]
        followings:[User]
    }
   
`;


export default typeDefs