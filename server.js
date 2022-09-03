import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    """
    username: String! -> this field is required, username: String -> this field can be null
    """
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }

  type Query {
    """
    allTweets: []! -> this function return list, allTweets: [Tweet!]! -> this function return list filled with Tweet
    """
    allTweeets: [Tweet!]!
    tweet(id: ID!): Tweet!
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
