// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      userName:'zhangsan',
      age:18
    },
    tname:'lisi'
  },
  changeName(){
    // this.setData({
    //   //第一种方式：通过object.assgin（）
    //  userInfo:Object.assign(this.data.userInfo,{userName:'wangwu'})
    // })
    this.setData({
      //第一种方式：通过object.assgin（）
     userInfo:{
       ...this.data.userInfo,
       userName:'wangwu'
      }
    })
    console.log(this.data.userInfo);
  },
  sayHello(event){
    console.log('hello',event.currentTarget.dataset.stuName);
  },
  outer(){
    console.log('我是外面的盒子');
  },
  inner(){
    console.log('我是里面的盒子');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})