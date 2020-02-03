import {
  UPDATE_TOKEN,
  UPDATE_USER_INFO
} from '../constants/auth'

export const updateToken = (token: string) => {
  return {
    type: UPDATE_TOKEN,
    access_token: token
  }
}
export const updateUserInfo = (user: object) => {
  return {
    type: UPDATE_USER_INFO,
    user: user
  }
}

export function asyncUpdateToken (token: string) {
  return dispatch => {
    setTimeout(() => {
      dispatch(updateToken(token))
    }, 2000)
  }
}

export function asyncUpdateUserInfo (user: object) {
  return dispatch => {
    setTimeout(() => {
      dispatch(updateUserInfo(user))
    }, 2000)
  }
}
