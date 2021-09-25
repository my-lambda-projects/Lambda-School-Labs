// This file Create graphQL server entry point
// Import Mutation, Query, and db
const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: `https://cookbookproject.auth0.com/.well-known/jwks.json`
});

function getKey(header, cb) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: "7klW1TtJaes7ZrekqNXavbJrwWQLkDf0",
  issuer: `https://cookbookproject.auth0.com/`,
  algorithms: ["RS256"]
};

// Create server with typeDefs, resolvers, and context(database)
function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: ({ request }) => {
      const token = request.headers.authorization;
      const user = new Promise((resolve, reject) => {
        jwt.verify(token, getKey, options, (err, decoded) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });
      return {
        ...request,
        db,
        user
      };
    }
  });
}

module.exports = createServer;
