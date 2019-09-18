//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    wx.cloud.callFunction({
      name: 'getVoteResult',
      data: {}
    }).then((res) => {
      debugger
      this.sortVoteResult(res.result)
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
    console.log(`sort result${arr}`)
    debugger
  }
})
