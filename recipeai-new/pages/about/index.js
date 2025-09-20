// pages/about/about.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    version: 'v2.1.0',
    updateDate: '2023-10-15',
    developer: '健康科技工作室',
    description: '多囊健康助手是一款专为多囊卵巢综合征(PCOS)患者设计的健康管理应用，提供个性化饮食建议、运动方案和健康追踪工具。'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 可以在这里添加页面加载时的逻辑
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '多囊健康助手 - 您的专属健康管理伙伴',
      path: '/pages/about/about',
      imageUrl: '/images/share-about.jpg'
    }
  }
})