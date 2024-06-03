const Mutation =`#graphql
createUser(firstName:String!,lastName:String!,email:String!,password:String!):String
followUser(to:String!):Boolean

`

export default Mutation;
