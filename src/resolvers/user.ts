import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateHashedPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);

	const hash = bcrypt.hashSync(password, salt);

	return hash;
}

const createToken = (id: string) => {
	const payload = {
		iss: 'gymlog-auth',
    sub: id,
	};

  const secretKey: jwt.Secret = process.env.TOKEN_SECRET || "";
  
  const token = jwt.sign(payload, secretKey, { expiresIn: '5m' });
  
	return token;
};

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
    createUser: async (root: any, { input }: any, { models }: any, info: any) => {
      const { username, email, password } = input;

      const duplicatedUser = await models.User.findOne({
        where: {
          username: username,
        },
      });

      if (duplicatedUser) {
        return {
          status: 400,
          message: "Duplicated username.",
          token: null,
        }
      } else {
        const hash = generateHashedPassword(password);

        const currentTime = `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getUTCDate()} ${(new Date().getHours() + 8) % 24}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}:${(new Date().getSeconds() < 10 ? '0' : '') + new Date().getSeconds()}`;

        const createUserResult = await models.User.create({
          username: username,
          email: email,
          password: hash,
          role: 'user',
          createdAt: currentTime,
          updatedAt: currentTime,
        });

        if (createUserResult) {
          return {
            status: 200,
            message: "Create user successful.",
            token: createToken(createUserResult._id),
          };
        } else {
          return {
            status: 400,
            message: "Failed to create user.",
            token: null,
          };
        }
      }
    },
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
    },
    login: async (root: any, { input }: any, { models }: any, info: any) => {
      const { username, password } = input;

      const targetUser = await models.User.findOne({
        where: {
          username: username,
        },
      });

      if (!targetUser) {
        return {
          status: 400,
          message: "Non-existing user.",
          token: null,
        };
      } else {
        const hash = generateHashedPassword(password);
        const compareHash = hash === targetUser.password;

        if (!compareHash) {
          return {
            status: 400,
            message: "Invalid password.",
            token: null,
          };
        } else {
          return {
            status: 200,
            message: "Login Successful.",
            token: createToken(targetUser._id),
          };
        }
      }
    },
    verify: async (root: any, { token }: any, { models }: any, info: any) => {
      jwt.verify(token, process.env.TOKEN_SECRET || "", async (error: any, decoded: any) => {
        if (error) {
          return null;
        }

        const targetUser = await models.User.findById(decoded.sub);

        return targetUser;
      });
    },
  },
};
