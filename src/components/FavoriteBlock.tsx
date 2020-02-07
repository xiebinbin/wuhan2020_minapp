import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

type Props = {
    info: {
        id, 
        imgUrl, 
        title, 
        description, 
        time, 
        type
    }
}

export default class FavoriteBlock extends Component<Props, {}> {

    toDetailPage = (id) => {
        console.log(id)
    }

    onDeleteBlock = (id) => {
        console.log("delete" + id)
    }

    render() {
        const {id, imgUrl, title, description, time, type} = this.props.info;
        return <View style="at-article"
                     onClick={() => {this.toDetailPage(id)}}
                >
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
                        <View className='at-col at-col-2'>
                            {time}
                        </View>
                        <View className='at-col at-col-2'>
                            {type}
                        </View>
                        <View className='at-col at-col-2'>
                            <View className='at-icon at-icon-close favorite-delete-icon' 
                                  onClick={this.onDeleteBlock}>
                            </View>
                        </View>
                    </View>
                </View>
    }
}