import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.scss'
import mockData from "./mockData"
import FavoriteBlock from '../../components/FavoriteBlock';

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
                        <FavoriteBlock info={item} />
                   </View>
          })
        }
      </View>
    )
  }
}

export default Index;
