import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

class Index extends Component {
    config: Config = {
    navigationBarTitleText: '我的'
  }

  render () {
    return (
      <View className='index'>
        <View><Text>设置我的基础信息 姓名 简介等</Text></View>
      </View>
    )
  }
}
export default Index;
