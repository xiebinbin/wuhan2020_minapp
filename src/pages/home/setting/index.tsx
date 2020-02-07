import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker, Button} from '@tarojs/components'
import { AtNavBar, AtAvatar, AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput} from 'taro-ui'

import PlaceHolderImg from "../../../../assets/default_avator.png"

import './index.scss';

let identites = ["医生","呼市", "其他"]
let provinces = ["上海", "北京"]
let districts = [
  ["浦东", "浦西"],
  ["西城", "东城"]
]

let data = {
  identity: identites,
  province: provinces,
  district: districts
}

let info = {
  "name": "用户名",
  "signature": "签名",
  "phoneNumber": "电话",
  "email": "邮箱"
}

class Index extends Component {

  handleSaveInfo = () => {
    console.log("Change updated")
  }

  state = {
    isOpened: true,
    editingInfoId:"",
    editingInfo: "",
    username: "哈哈",
    editingText: "输入信息",
    identity: ["医生"],
    signature: "我是守护者",
    phoneNumber: "10000000",
    email: "xxx@163.com",
    provinceIndex: 0,
    province: "选择",
    district: "选择"
  }

  onChange = (e) => {
    let id = e.currentTarget.id
    switch (id) {
      case "identity":
          this.setState({
            [id]: data[id][e.detail.value]
          })
      case "province":
          this.setState({
            provinceIndex: e.detail.value,
            province: data[id][e.detail.value],
            district: data["district"][e.detail.value][0],
          })
      case "district":
          this.setState({
            "district": data["district"][this.state.provinceIndex][e.detail.value]
          })
    }
  }

  onEditInput = (e) => {
    let id = e.currentTarget.id
    this.setState({
      isOpened: true,
      editingInfoId: id,
      editingInfo: info[id],
      editingText: this.state[id]
    })
    console.log(e)
  }

  onInputChange = (value) => {
    this.setState({
      editingText: value
    })
    console.log(this.state.editingText)
  }

  render () {
    return (
      <View className='setting'>
        <AtModal isOpened={this.state.isOpened}>
          <AtModalContent>
            <AtInput
              title={this.state.editingInfo}
              name='value' 
              value={this.state.editingText}
              onChange={this.onInputChange}
              type='text'
              placeholder='单行文本' 
            />
          </AtModalContent>
          <AtModalAction> 
            <Button onClick={()=>{this.setState({isOpened: false})}}>
              取消
            </Button> 
            <Button onClick={()=>{
              let id = this.state.editingInfoId
              let text = this.state.editingText
              this.setState({
                isOpened: false,
                [id]: text
              })
              }}>确定</Button> 
          </AtModalAction>
        </AtModal>
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
              {this.state.username}
              <View className='at-icon at-icon-edit' id="username" onClick={this.onEditInput}></View>
            </View>
          </View>

          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>身份</Text>
            </View>
            <View className='at-col-7'>
              <Picker mode='selector' id="identity" range={data["identity"]} onChange={this.onChange}>
                <View className='picker' style="color: gray;">
                  {this.state.identity} 
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
              {this.state.signature}
              <View className='at-icon at-icon-edit' id="signature" onClick={this.onEditInput}></View>
            </View>
          </View>

          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>联系电话</Text>
            </View>
            <View className='at-col-7'>
              {this.state.phoneNumber}
              <View className='at-icon at-icon-edit' id="phoneNumber" onClick={this.onEditInput}></View>
            </View>
          </View>

          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>联系邮箱</Text>
            </View>
            <View className='at-col-7'>
              {this.state.email}
              <View className='at-icon at-icon-edit' id="email" onClick={this.onEditInput}></View>
            </View>
          </View>

          <View className='at-row setting-info-padding'>
            <View className='at-col-5 setting-text-center'>
              <Text>所在地区</Text>
            </View>
            <View className='at-col-7'> 
              <View className='at-row'>
                <View className='at-col-5'>
                  <Picker mode='selector' id="province" range={data["province"]} onChange={this.onChange}>
                    <View className='picker' style="color: gray;">
                     {this.state.province}
                    </View>
                  </Picker>
                </View>
                <View className='at-col-5'>
                  <Picker mode='selector' id="district" range={data["district"][this.state.provinceIndex]} onChange={this.onChange}>
                    <View className='picker' style="color: gray;">
                      {this.state.district} 
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
