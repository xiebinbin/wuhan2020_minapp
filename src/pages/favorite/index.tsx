import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'
import mockData from "./mockData"

class Index extends Component {

  config: Config = {
        navigationBarTitleText: '收藏'
  }

  state = {
    data: mockData
  }

  toDetailPage = (id) => {
    console.log(id)
  }

  render () {
    return (
      <View className='at-row at-row--wrap favorite-containter'>
        {
          this.state.data.map(item => {
            const {id, imgUrl, title, description, time, type} = item
            return <View 
                    onClick={() => {this.toDetailPage(id)}}
                    className='at-col at-col-6 at-col--wrap favorite-block-padding' 
                    key={id}>
                        <View style="at-article">
                         <Image 
                            className="favorite-block-img"
                            src={imgUrl}
                          />
                          <View className="at-article__h3">
                            <Text>{title}</Text>
                          </View>
                          <View className="at-article__info favorite-block-description">
                            <Text>{description}</Text>
                          </View>
                          <View className='at-row at-row__justify--between'>
                            <View className='at-col at-col-2'>{time}</View>
                            <View className='at-col at-col-2'>{type}</View>
                          </View>
                        </View>
                   </View>
          })
        }
      </View>
    )
  }
}

export default Index;
