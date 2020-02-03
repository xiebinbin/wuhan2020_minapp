import Taro from '@tarojs/taro';
import { UPDATE_TOKEN, UPDATE_USER_INFO } from '../constants/auth'

const TOKEN_KEY = 'token';

const INITIAL_STATE = {
  access_token: '',
  user: {
    name: '',
    phone: '',
    created_at: ''
  }
}

export default function auth (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      Taro.setStorage(
        {
          key: TOKEN_KEY,
          data: action.access_token
        }
      )
      return {
        ...state,
        access_token: action.access_token
      }
     case UPDATE_USER_INFO:
       return {
         ...state,
         user: action.user
       }
     default:
       return state
  }
}
