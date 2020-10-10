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
    status: Int!
    message: String!
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

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): AuthenticationResult!
    updateUser(id: ID, input: UpdateUserInput!): User!
    deleteUser(id: ID): DeleteUserPayload!
    login(input: LoginInput!): AuthenticationResult!
    verify(token: String!): User
  }
`;
