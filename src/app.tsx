import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import 'taro-ui/dist/style/index.scss';
import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/login/index',
      'pages/home/index/index',
      'pages/home/setting/index',
      'pages/home/demand-side/index',
      'pages/favorite/index',
      'pages/about/index',

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom'
    },
    tabBar: {
      list: [{
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "icons/tabbar/home.png",
        "selectedIconPath": "icons/tabbar/home_check.png",
      }, {
        "pagePath": "pages/favorite/index",
        "text": "收藏",
        "iconPath": "icons/tabbar/favorite.png",
        "selectedIconPath": "icons/tabbar/favorite_check.png",
      },
      {
        "pagePath": "pages/home/index/index",
        "text": "我的",
        "iconPath": "icons/tabbar/ucenter.png",
        "selectedIconPath": "icons/tabbar/ucenter_check.png",
      }]
    },
  }
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
