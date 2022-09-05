import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first one!",
    userId: "2",
  },
  {
    id: "2",
    text: "second one!",
    userId: "1",
  },
];

let users = [
  {
    id: "1",
    firstName: "Taewoo",
    lastName: "Han",
  },
  {
    id: "2",
    firstName: "Terry",
    lastName: "Han",
  },
];

const typeDefs = gql`
  type User {
    """
    username: String! -> this field is required, username: String -> this field can be null
    """
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    fullName: String!
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
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet!
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      console.log("all users called!");
      return users;
    },
  },

  Mutation: {
    postTweet(_, { text, userId }) {
      // 첫번째는 root, 두번째는 args
      const userFind = users.find((user) => user.id === userId);
      if (!userFind) throw new error("userId is not found");
      const newTweet = {
        id: tweets.length + 1,
        text,
        userId,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },

  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
