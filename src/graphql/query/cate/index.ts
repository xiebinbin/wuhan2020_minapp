import getClient from '../../client';
import queryAllCateGQL from './all.gql';

export const main = () => false

export const queryAllCate = () => getClient(true).query({
  query: queryAllCateGQL,
  fetchPolicy: 'no-cache'
})