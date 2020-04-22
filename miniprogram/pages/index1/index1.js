// pages/index1/index1.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1: '',
    img2: '',
    img3: '',
    img4: ''
  },
  uploadimg: function(event) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // const tempFilePaths = res.tempFilePaths
        // //防止图片文件名相同 导致图片的覆盖 生成随机数
        // let randomImage = Math.floor(Math.random() * 100000).toString() + '.png'
        // //上传到云端
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = 'Hi-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log(res)
            wx.showToast({
              title: "上传成功",
              icon: 'success'
            })
             //调用图片审查
            wx.cloud.callFunction({
              name: "checkSafeImg",
              data: {
                cloudPath: cloudPath
              }
            }).then((res) => {
              console.log(res)
              //console.log(res.result.AdsInfo.HitFlag)
              if (res.result.AdsInfo.HitFlag === 0 && res.result.PoliticsInfo.HitFlag === 0 && res.result.PornInfo.HitFlag === 0 && res.result.TerroristInfo.HitFlag === 0) {

                //调用智能剪裁
                wx.cloud.callFunction({
                  name: "cutImg",
                  data: {
                    fileID: fileID,
                    pixel: [{
                      width: 100,
                      height: 100
                    }, {
                      width: 300,
                      height: 202
                    }, {
                      width: 160,
                      height: 88
                    }]
                  }
                }).then(res => {
                  console.log(res)
                  that.setData({
                    img1: fileID,
                    img2: res.result[0],
                    img3: res.result[1],
                    img4: res.result[2],
                    height: 400
                  })
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: '您上传的图片有敏感信息，请重新上传',
                })
              }
            })
          },
          fail: console.error
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})