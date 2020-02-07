import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'
import mockData from "./mockData"
import FavoriteBlock from '../../components/FavoriteBlock/FavoriteBlock';

class Index extends Component {

  state = {
    data: mockData
  }

  render () {
    return (
      <View className='at-row at-row--wrap favorite-containter'>
        {
          this.state.data.map(item => {
            const {id} = item
            return <View 
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
