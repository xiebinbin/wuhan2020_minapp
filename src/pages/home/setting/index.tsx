import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtNavBar, AtAvatar, AtIcon} from 'taro-ui'

import PlaceHolderImg from "../../../../assets/default_avator.png"

import './index.scss'


class Index extends Component {
    config: Config = {
    navigationBarTitleText: '我的'
  }

  handleSaveInfo = () => {
    console.log("Change updated")
  }

  state = {
    selector: ['美国', '中国', '巴西', '日本'],
    selectorChecked: '美国',
    timeSel: '12:01',
    dateSel: '2018-04-22'
  }
onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }
onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    })
  }
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  render () {
    return (
      <View className='setting'>
        <AtNavBar
            onClickRgIconSt={this.handleSaveInfo}
            onClickLeftIcon={()=>{Taro.navigateBack()}}
            color='#000'
            title=''
            leftText='< Back'
            rightFirstIconType='check'
          />
        <View className="setting-header">
          <AtAvatar circle size="large" image={PlaceHolderImg}></AtAvatar>
        </View>
        <View>
          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>用户名</Text>
            </View>
            <View className='at-col-7'>
              <Text>小伙子</Text>
            </View>
          </View>

          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>身份</Text>
            </View>
            <View className='at-col-7'>
              <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                <View className='picker' style="color: gray;">
                  {this.state.selectorChecked} 
                  <AtIcon value='arrow-up' size='20' ></AtIcon>
                </View>
              </Picker>
            </View>
          </View>
          
          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>个性签名</Text>
            </View>
            <View className='at-col-7'>
              <Text>用户名</Text>
            </View>
          </View>

          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>联系电话</Text>
            </View>
            <View className='at-col-7'>
              <Text>用户名</Text>
            </View>
          </View>

          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>联系邮箱</Text>
            </View>
            <View className='at-col-7'>
              <Text>xc100</Text>
            </View>
          </View>

          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>所在地区</Text>
              <Gan isFixed={true} />
            </View>
            <View className='at-col-7'>
              <View className='at-row'>
                <View className='at-col-5'>
                  <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                    <View className='picker' style="color: gray;">
                      {this.state.selectorChecked} 
                      <AtIcon value='arrow-up' size='20' ></AtIcon>
                    </View>
                  </Picker>
                </View>
                <View className='at-col-5'>
                  <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                    <View className='picker' style="color: gray;">
                      {this.state.selectorChecked} 
                      <AtIcon value='arrow-up' size='20' ></AtIcon>
                    </View>
                  </Picker>
                </View>
              </View>
            </View>
          </View>

        </View>
      </View>
    )
  }
}
export default Index;
