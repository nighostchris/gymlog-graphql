export default `
  type User {
    id: ID!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }
`;
