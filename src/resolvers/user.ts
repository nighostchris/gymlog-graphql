export default {
  Query: {
    users: async (root: any, args: any, { models }: any, info: any) => {
      return await models.User.find();
    },
    user: async (root: any, { id }: any, { models }: any, info: any) => {
      return await models.User.findById(id);
    },
  },
  Mutation: {
    updateUser: async (root: any, { id, input }: any, { models }: any, info: any) => {
      const targetUser = await models.User.findOne({ _id: id });
    
      Object.keys(input).forEach((value) => {
        targetUser[value] = input[value];
      });
    
      return await targetUser.save();
    },
    deleteUser: async (root: any, { id }: any, { models }: any, info: any) => {
      await models.User.deleteOne({ _id: id });
    
      return { id: id };
    }
  },
};
