import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard, AtButton } from "taro-ui"

import './index.scss'

type Props = {
    editable,
    info: {
        id,
        name,
        date,
        content
    }
}

class MyPostBlock extends Component<Props, {}> {

    render() {
        const {id, name, date, content} = this.props.info
        let editable = this.props.editable
        return  <View className="demand-card-padding">
                    <AtCard
                        title={name}
                        extra={date}
                    > 
                        <Text>{content}</Text>
                        {
                            editable &&  <AtButton type='secondary'>删除</AtButton>
                        }
                    </AtCard>
                </View>
    }

}

export default MyPostBlock

