// pages/index1/index1.js'
const db = wx.cloud.database()
const photos = db.collection('photos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: "/images/Cloud.png"
  },
  uploadimg: function(event) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths
        //防止图片文件名相同 导致图片的覆盖 生成随机数
        let randomImage = Math.floor(Math.random() * 100000).toString() + '.png'
        //上传到云端
        wx.cloud.uploadFile({
          cloudPath: randomImage,
          filePath: tempFilePaths[0],
          success: res => {
            console.log(res.fileID)
            photos.add({
              data: {
                image: res.fileID
              }
            }).then(res => {
              wx.showToast({
                title: "上传成功",
                icon: 'success'
              })
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
    wx.showToast({
      title: '数据获取中...',
    })

    photos.where({
      _openid: options.id
    }).get().then(res => {
      console.log(res)
      this.setData({
        photos: res.data[0].image
      })
    })



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