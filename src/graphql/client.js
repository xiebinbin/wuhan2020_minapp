import ApolloClient, { InMemoryCache } from 'apollo-boost'
import Taro from '@tarojs/taro';

const domain = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/' : 'https://wh.xmw.red/';

const cache = new InMemoryCache()
export default (security = false) => {
  const headers = {
    Authorization: '',
  };
  if(security) {
    // 获取存储的token
    const token = ''
    headers.Authorization = `Bearer ${token}`
  }
  const uri = `${domain}graphql`;
  return new ApolloClient({
    onError: (error) => {
      const { graphQLErrors } = error;
      if (graphQLErrors && graphQLErrors.length > 0) {
        
        let message = graphQLErrors[0].message
        if (message === 'Unauthenticated') {
          message = '登录失效!'
        }
        Taro.showToast({
          title: message,
          icon: 'none',
          duration: 5000
        });
        if (message === '登录失效!') {
          Taro.redirectTo({url: '/pages/login/index'})
        }
      }
    },
    uri,
    headers,
    fetch: (url, options) => Taro.request({
      url,
      method: options.method,
      data: options.body,
      header: options.headers,
    }).then(({data, statusCode}) => {
      return {
        ok: () => {
          return statusCode >= 200 && statusCode < 300;
        },
        text: () => {
          return Promise.resolve(JSON.stringify(data));
        }
      }
    }).catch(error => Promise.reject(error)),
    cache
  })
}