import { gql } from 'apollo-boost';

export default gql`mutation send_sms($input: SendSmsCodeInput!){
  send_sms(input: $input) {
    status
    message
  }
}
`