import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import {AtSearchBar, AtTabs, AtTabsPane} from "taro-ui";
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'
import mockSuppliers from "./mockSupplierData"
import Uploader from '../../util/uploader'
// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
      value: '',
      current: 0,
      statusBarHeight: '',
      supplierList: mockSuppliers,
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount () {
    Taro.getSystemInfo({
      success: res => {
        console.log(res.statusBarHeight);
        this.setState({
          statusBarHeight: res.statusBarHeight + 'px'
        })
      }
    }).then(res => console.log(res))
  }
  componentWillUnmount () {
  }

  componentDidShow () { }

  componentDidHide () { }

  onChange (value) {
    this.setState({
      value: value
    })
    return value
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  renderSuppliers () {
      const { supplierList } = this.state

      const renderList = supplierList.map( item =>
          <View className='index-item' onClick={() => {
            Uploader().then((rep) => {
              console.log(rep)
            })
          }}>
            <View className='index-item-head'>
              <View className='item-head-left'>
                <Image
                  className='index-item-avatar'
                  src={item.userAvatar}
                />
                <View className='index-item-head-title'>
                  <View className='head-title-name'>{item.userName}</View>
                  <View className='head-title-data'>{item.uploadDate}</View>
                </View>
              </View>
              <View className='index-item-head-type'>{item.type}</View>
            </View>
            <View className='index-item-content'>
              {item.message}
            </View >
            <View className='item-images'>
              {
                item.images.map ( image =>
                  <Image
                    className='index-item-image'
                    src={image}
                  />
                )
              }
            </View>
          </View>
      )
      return <View className='index-list'>{renderList}</View>;
  }



  render () {
    const tabList = [{ title: '需求' }, { title: '援助' }]
    return (
      <View className='index'>
        {/*<Button className='add_btn' onClick={this.props.add}>+</Button>*/}
        {/*<Button className='dec_btn' onClick={this.props.dec}>-</Button>*/}
        {/*<Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>*/}
        {/*<Button className='dec_btn' onClick={() => {*/}
        {/*  Taro.navigateTo({*/}
        {/*    url: '/pages/about/index'*/}
        {/*  })*/}
        {/*}}>关于我们</Button>*/}
        {/*<View><Text>{this.props.counter.num}</Text></View>*/}
        {/*<View><Text>首页</Text></View>*/}
        <View className='status-bar' style={{ height: this.state.statusBarHeight}}></View>
        <View className='index-content'>
          <View className='filter-search-bar'>
            <AtSearchBar
              value={this.state.value}
              onChange={this.onChange.bind(this)}
            />
          </View>
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              {this.renderSuppliers()}
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View style='height:100%;padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
