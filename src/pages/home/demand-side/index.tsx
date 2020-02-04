import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtCard } from "taro-ui"

import './index.scss'

class Index extends Component {
    config: Config = {
    navigationBarTitleText: '我的'
  }

  handleClick = () => {
    console.log("Clicked")
  }

  render () {
    return (
      <View className='demand-side'>
         <AtNavBar
            onClickRgIconSt={this.handleClick}
            onClickLeftIcon={()=>{Taro.navigateBack()}}
            color='#000'
            rightFirstIconType='edit'
            leftText='< Back'
          /> 

          <View className="at-article__h2">
            <Text>我发布的求助</Text>
          </View>

          <View className="demand-card-padding">
            <AtCard
              title='医院'
              extra="2010.01.31"
            > 
              <Text>dasfsdfadsfds</Text>
            </AtCard>
          </View>

          <View className="at-article__h2">
            <Text>我发布的援助</Text>
          </View>

          <View className="demand-card-padding">
            <AtCard
              title='医院'
              extra="2010.01.31"
            > 
              <Text>dasfsdfadsfds</Text>
            </AtCard>
          </View>

      </View>
          
    )
  }
}
export default Index;
