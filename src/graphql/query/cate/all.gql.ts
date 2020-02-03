import { gql } from 'apollo-boost';

export default gql`query query_all_cate{
  cates{
    id
    name
    code
  }
}
`