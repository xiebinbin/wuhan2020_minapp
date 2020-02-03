import Taro, { Component,getSystemInfoSync } from '@tarojs/taro';
import { ComponentClass } from 'react'
import validate from 'validate.js';
import { View, Text } from '@tarojs/components';
import { AtButton, AtNavBar, AtInput } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { asyncUpdateToken, asyncUpdateUserInfo } from '../../actions/auth';


import './index.scss'
import { sendSms, smsLogin } from '../../graphql/mutation/auth/index';

const sendSmsFormRules = {
  phone: {
    presence: {
      allowEmpty: false,
      message: '手机号不能为空!'
    },
    length: {
      minimum: 11,
      maximum: 11,
      message: '手机号长度为11位'
    },
    format: {
      pattern: '[0-9]+',
      flags: 'i',
      message: '手机号只能为数字!'
    }
  },
}
const submitFormRules = {
  phone: {
    presence: {
      allowEmpty: false,
      message: '手机号不能为空!'
    },
    length: {
      minimum: 11,
      maximum: 11,
      message: '手机号长度为11位'
    },
    format: {
      pattern: '[0-9]+',
      flags: 'i',
      message: '手机号只能为数字!'
    }
  },
  code: {
    presence: {
      allowEmpty: false,
      message: '验证码不能为空!'
    }
  },
}
type PageStateProps = {
  auth: {
    access_token: string,
    user: object
  }
}
type PageOwnProps = {}
type PageDispatchProps = {
  asyncUpdateToken: (token: string) => void
  asyncUpdateUserInfo: (user: object) => void
}
type PageState = {}
type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ auth }) => ({
  auth
}), (dispatch) => ({
  asyncUpdateUserInfo (user: object) {
    dispatch(asyncUpdateUserInfo(user))
  },
  asyncUpdateToken (token: string) {
    dispatch(asyncUpdateToken(token))
  }
}))
class Index extends Component<any, any>{
  constructor (props) {
    super(props);
    const systemInfo = getSystemInfoSync()
    const height = Taro.getMenuButtonBoundingClientRect().height + systemInfo.statusBarHeight
    this.state = {
      containerStyle: {
        paddingTop: height + 'px',
      },
      formData: {
        phone: '',
        code: ''
      },
      sendSmsStatus: false,
      submitStatus: false,
      sendSmsText: '获取验证码',
    }
  }
  submit() {
    const { submitStatus } = this.state;
    if(submitStatus){
      Taro.showToast({
        title: '稍后重试...',
        icon: 'none',
        duration: 2000
      });
    }
    this.validatorSubmit().then(() => {
      const { formData } = this.state
      this.setState({submitStatus: true})
      smsLogin({
        input: formData
      }).then((rep) => {
        Taro.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        });
        // 存储token
        const { access_token, user } = rep.data.sms_login.data;
        const updateToken = this.props.asyncUpdateToken;
        const updateUserInfo = this.props.asyncUpdateUserInfo;
        updateToken(access_token)
        updateUserInfo({
          name: user.name,
          phone: user.phone,
          created_at: user.created_at
        })
        Taro.switchTab({
          url: '/pages/index/index'
        })
        this.setState({submitStatus: false})
      }).catch(() => {
        this.setState({submitStatus: false})
      })
    })
  }
  validatorSendSms() {
    return new Promise((resolve, reject) => {
      const { formData } = this.state;
      const result = validate.validate(formData, sendSmsFormRules, { format: 'flat', fullMessages: false });
      if(result){
        Taro.showToast({
          title: result[0],
          icon: 'none',
          duration: 2000
        });
        reject();
      } else {
        resolve();
      }
    })
  }
  validatorSubmit() {
    return new Promise((resolve, reject) => {
      const { formData } = this.state;
      const result = validate.validate(formData, submitFormRules, { format: 'flat', fullMessages: false });
      if(result){
        Taro.showToast({
          title: result[0],
          icon: 'none',
          duration: 2000
        });
        reject();
      } else {
        resolve();
      }
    })
  }
  sendSms() {
    const { sendSmsStatus } = this.state;
    if(sendSmsStatus){
      Taro.showToast({
        title: '稍后重试...',
        icon: 'none',
        duration: 2000
      });
    }
    this.validatorSendSms().then(() => {
      const { formData } = this.state
      this.setState({sendSmsStatus: true})
      sendSms({
        input: {
          phone: formData.phone
        }
      }).then(() => {
        Taro.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        });
        let count = 120;
        const timeout = setInterval(() => {
          if(count <= 0){
            clearInterval(timeout);
            this.setState({sendSmsText: '获取验证码!',sendSmsStatus: false})
          } else {
            this.setState({sendSmsText: `${count}秒后重试`})
            count--;
          }
        }, 1000);
      }).catch(() => {
        this.setState({sendSmsStatus: false})
      })
    })
  }
  render () {
    const { formData, containerStyle, sendSmsText, sendSmsStatus, submitStatus } = this.state;
    return (
      <View style={containerStyle} className='page-container'>
        <AtNavBar
          onClickLeftIcon={() => Taro.navigateBack()}
          leftIconType='chevron-left'
        />
        <View className='at-row at-row__align--center'>
          <View className='at-col'>
            <View style='text-align:center;'>
              <Text className='title'>武汉2020-验证码登录</Text>
            </View>
          </View>
        </View>
        <View className='at-row' style='padding:15px 0px;'>
          <View className='at-col'>
            <AtInput
              name='phone'
              title='手机号'
              type='text'
              placeholder='请输入手机号'
              value={formData.phone}
              onChange={(value: any) => {
                formData.phone = value
                this.setState({formData})
              }}
            />
          </View>
        </View>
        <View className='at-row at-row__align--center'  style='padding:7.5px 0px;'>
          <View className='at-col at-col-8'>
            <AtInput
              name='code'
              title=''
              type='text'
              placeholder='输入验证码'
              value={formData.code}
              onChange={(value: any) => {
                formData.code = value
                this.setState({formData})
              }}
            />
          </View>
          <View className='at-col at-col-4'>
            <AtButton disabled={sendSmsStatus} onClick={this.sendSms.bind(this)} type='secondary' size='small'>{sendSmsText}</AtButton>
          </View>
        </View>
        <View className='at-row' style='padding:15px 0px;'>
          <View className='at-col'>
            <AtButton disabled={submitStatus} loading={submitStatus} onClick={this.submit.bind(this)} type='primary'>登录</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
export default Index as ComponentClass<PageOwnProps, PageState>;
