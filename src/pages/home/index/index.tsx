import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar, AtButton } from "taro-ui"

import mockData from "./mockData"
import './index.scss'

const SETTING_PAGE = "/pages/home/setting/index"
const MY_REQUEST_PAGE = "/pages/home/demand-side/index"

class Index extends Component {
    config: Config = {
    navigationBarTitleText: '我的'
  }

  state = {
    data: mockData
  }

  handleClickInfo = (page) => {
    Taro.navigateTo({
      url: page
    })
  }

  handleLogout = () => {
    console.log("logout")
  }

  render () {
    const {imgUrl, name, job, description} = this.state.data
    return (
      <View className="profile-containter">
        <View className='at-row profile-header'>
          <View className='at-col-4 profile-header-imgView'>
            <AtAvatar size="large" circle image={imgUrl} />
          </View>
          <View className='at-col-8 at-article'>
            <View className="at-article__h3">
              <Text>{name}</Text>
            </View>
            <View className="at-article__p">
              <Text>{job}</Text>
            </View>
            <View className="at-article__p">
              <Text>{description}</Text>
            </View>
          </View>
        </View>
        <AtList hasBorder={false}>
          <AtListItem title='我的发布' arrow='right' onClick={() => {this.handleClickInfo(MY_REQUEST_PAGE)}} />
          <AtListItem title='编辑资料' arrow='right' onClick={() => {this.handleClickInfo(SETTING_PAGE)}} />
          <AtListItem title='关于我们' arrow='right' onClick={() => {this.handleClickInfo(SETTING_PAGE)}}/>
        </AtList>
        <View className="profile-logout-button">
         <AtButton type='primary' onClick={this.handleLogout}>退出登录</AtButton>
        </View>
      </View>
    )
  }
}

export default Index;
