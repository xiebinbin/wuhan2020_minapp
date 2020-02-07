import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtCard } from "taro-ui"

import MyPostBlock from "../../../components/MyPostBlock/MyPostBlock"
import './index.scss'

class Index extends Component {

  handleClick = () => {
    let editable = this.state.editable
    this.setState({
        editable: !editable
    })
  }

  state = {
    editable: true,
    demandPost: [
      {
        id: 1,
        name: '医院',
        date: "2010.01.31",
        content:"safdsfdfasdfsd"
      },
      {
        id: 2,
        name: '医院',
        date: "2010.01.31",
        content:"safdsfdfasdfsd"
      }
    ],
    rescuePost: [
      {
        id: 1,
        name: '医院',
        date: "2010.01.31",
        content:"safdsfdfasdfsd"
      },
      {
        id: 2,
        name: '医院',
        date: "2010.01.31",
        content:"safdsfdfasdfsd"
      }
    ]
  }

  render () {
    return (
      <View className='demand-side'>
         <AtNavBar
            onClickRgIconSt={this.handleClick}
            onClickLeftIcon={()=>{Taro.navigateBack()}}
            color='#000'
            rightFirstIconType={this.state.editable ? 'check' : 'edit'}
            leftText='< Back'
          /> 

          <View className="at-article__h2">
            <Text>我发布的求助</Text>
          </View>

          {
            this.state.demandPost.map(item => {
              return <MyPostBlock 
                      info={item} 
                      editable={this.state.editable} 
                     />
            })
          }

          <View className="at-article__h2">
            <Text>我发布的援助</Text>
          </View>

          {
            this.state.rescuePost.map(item => {
              return <MyPostBlock 
                        info={item} 
                        editable={this.state.editable} 
                      />
            })
          }
      </View>    
    )
  }
}
export default Index;
