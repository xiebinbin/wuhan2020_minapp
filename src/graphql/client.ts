import ApolloClient, { InMemoryCache } from 'apollo-boost'
import Taro from '@tarojs/taro';
import { ErrorResponse } from 'apollo-link-error';

const domain = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/' : 'https://ssyd.knowledgebird.cn/';

const cache = new InMemoryCache()
export default (security = false) => {
  const onError = (error: ErrorResponse) => {
    const { graphQLErrors } = error;
    if (graphQLErrors && graphQLErrors.length > 0) {
      const message = graphQLErrors[0].message
      Taro.showToast({
        title: message,
        icon: 'none',
        duration: 5000
      });
      // 判断是否登录失效
    }
  }
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
    onError,
    uri,
    headers,
    fetch: (url: string, options: RequestInit) => {
      const method: any = options.method ? options.method : 'GET';
      const x: Taro.request.method = {
        GET: 'GET',
        OPTIONS: 'OPTIONS',
        HEAD: 'HEAD',
        POST: 'POST',
        PUT: 'PUT',
        DELETE:'DELETE',
        TRACE: 'TRACE',
        CONNECT: 'CONNECT'
      }
      return new Promise((resolve, reject) => {
        return Taro.request({
          timeout: 2000,
          url,
          method: x[method],
          data: options.body,
          header: options.headers,
        }).then(({data, statusCode}) => {
          return {
            ok: () => {
              return statusCode >= 200 && statusCode < 300;
            },
            text: () => {
              return resolve(data);
            }
          }
        }).catch((error: any)=> {
          return reject(error)
        })
      })
    },
    cache
  })
}