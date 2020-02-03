import { gql } from 'apollo-boost';

export default gql`mutation sms_login($input: SmsLoginInput!){
  sms_login(input: $input) {
    status
    message
    data {
      access_token
      user{
        name
        phone
        created_at
      }
    }
  }
}
`