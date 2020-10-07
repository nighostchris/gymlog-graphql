import { mergeTypeDefs } from '@graphql-tools/merge';
import user from './user';

const types = [
  user,
];

export default mergeTypeDefs(types);
