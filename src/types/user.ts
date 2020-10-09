export default `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type DeleteUserPayload {
    id: ID!
  }

  type AuthenticationResult {
    status: String!
    token: String
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
    role: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): AuthenticationResult!
    updateUser(id: ID, input: UpdateUserInput!): User!
    deleteUser(id: ID): DeleteUserPayload!
  }
`;
