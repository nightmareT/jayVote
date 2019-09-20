//index.js
import songListArrImport from './songList.js'
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    albumIndex: 1,
    showVoteModal: false,
    songListArr: [],
    albumList: ['JAY', '范特西', '八度空间', '叶惠美', '七里香', '十一月的肖邦',
    '依然范特西', '我很忙', '魔杰座', '跨时代', '惊叹号', '十二新作', '哎哟，不错哦',
    '周杰伦的床边故事', '其他单曲'],
    songIndex: 0,
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    console.log(songListArrImport)
    console.log(`wx.total${wx.total}`)
    this.setData({
      songListArr: songListArrImport
    })
    // this.vote(['0101', '0201', '0301'])
    // wx.cloud.callFunction({
    //   name: 'getVoteResult',
    //   data: {}
    // }).then((res) => {
    //   if (res.result.hasOwnProperty('userInfo')) {
    //     console.log('quert failed')
    //   }
    //   const result = {'0101': 5, '0210': 3, '0102': 4, '0105': 1, '0106': 3}
    //   const sortResult = this.sortVoteResult(result)
    // })
  },

  bindPickerChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      songIndex: e.detail.value
    })
  },

  showModal: function() {
    console.log(this.showVoteModal)
    this.setData({
      showVoteModal: true,
    })
  },

  updateAlbum: function(event) {
    console.log(`update albumIndex${event}`)
    this.setData({
      albumIndex: event.detail + 1,
    })
  },

  vote: function(arr) {
    wx.cloud.callFunction({
      name: 'login',
      data: {
        params: arr
      }
    }).then((res) => {
      console.log(res)
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  sortVoteResult: function(voteResult) {
    const arr = []
    const compare = function(desc) {
      return function ( a, b ) {
        const value1 = a[Object.keys(a)[0]]
        const value2 = b[Object.keys(b)[0]]
        if ( desc == true ) {
          return value1 - value2
        } else {
          return value2 - value1;
        }
      }
    }
    Object.keys(voteResult).forEach((key) => {
      let obj = {}
      obj[key] = voteResult[key]
      arr.push(obj)
    })
    arr.sort(compare(false))
    return arr
  }
})
