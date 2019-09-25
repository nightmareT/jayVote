//index.js
import songListArrImport from '../songList.js'
const app = getApp()

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    songList: [],
    showVote: true,
    albumList: ['JAY', '范特西', '八度空间', '叶惠美', '七里香', '十一月的肖邦',
    '依然范特西', '我很忙', '魔杰座', '跨时代', '惊叹号', '十二新作', '哎哟，不错哦',
    '周杰伦的床边故事', '其他单曲'],
  },

  onLoad: function() {
    this.setData({
      songList: wx.songList
    })
  },

  // 页面结束后的vote函数
  vote: function() {
    console.log(`投票数据${wx.userVoteData}`)
    wx.cloud.callFunction({
      name: 'login',
      data: {
        params: wx.userVoteData
      }
    }).then((res) => {
      if (res.errMsg === 'cloud.callFunction:ok') {
        this.setData({
          showVote: false
        })
        wx.showToast({
          title: '投票成功',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '投票失败，请稍后再试',
          icon: 'none',
          duration: 2000
        })
      }
    }).catch((res) => {
      wx.showToast({
        title: '投票失败，请稍后再试',
        icon: 'none',
        duration: 2000
      })
    })
  },
})
