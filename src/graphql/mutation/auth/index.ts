import getClient from '../../client';
import sendSmsGQL from './send_sms.gql';
import smsLoginGQL from './sms_login.gql';

export const sendSms = (params) => getClient().mutate({
  mutation: sendSmsGQL,
  variables: params
})

export const smsLogin = (params) => getClient().mutate({
  mutation: smsLoginGQL,
  variables: params
})