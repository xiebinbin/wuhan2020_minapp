import Taro from '@tarojs/taro';

const URL  = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api/uploader' : 'https://wh.xmw.red/api/uploader';

export default (path = 'common') => {
  return new Promise((resolve, reject) => {
    // 选择图片
    const token = Taro.getStorageSync('token')
    Taro.chooseImage({}).then((res) => {
      const { tempFilePaths } = res;
      Taro.showLoading(
        {
          title: '上传中...',
          mask: true
        }
      )
      Taro.uploadFile({
        url: URL, //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        formData:{
          'path': path ? path : 'other'
        },
        header: {
          Authorization: `Bearer ${token}`
        }
      }).then((resa) => {
        if (resa.statusCode === 401) {
          Taro.showToast({
            title: '未登录',
            icon: 'none',
            duration: 2000
          })
          reject(new Error('未登录'));
          Taro.removeStorageSync('token');
          Taro.redirectTo({url: '/pages/login/index'})
        } else {
          Taro.hideLoading();
          resolve(JSON.parse(resa.data));
        }
      }).catch((erra) => {
        Taro.hideLoading();
        reject(erra)
      })
    }).catch((err) => reject(err));
  })
}