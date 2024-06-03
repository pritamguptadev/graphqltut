const Query = `#graphql
 hello:String,
say(name:String):String
getUserToken(email:String!,password:String!):User
getloggedInUser:User
getUserLoggedOut:String
`;




export default Query;
