//index.js
// import songListArrImport from '../songList.js'
const app = getApp()

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    albumIndex: 1,
    showVoteModal: false,
    topSongNameAlbumIndex: -1,
    topSongNameIndex: wx.topSongNameIndex ? wx.topSongNameIndex : 0,
    songListArr: [],
    albumList: ['JAY', '范特西', '八度空间', '叶惠美', '七里香', '十一月的肖邦',
    '依然范特西', '我很忙', '魔杰座', '跨时代', '惊叹号', '十二新作', '哎哟，不错哦',
    '周杰伦的床边故事', '其他单曲'],
    songIndex: 0,
  },

  onLoad: function() {
    wx.cloud.callFunction({
      name: 'getVoteResult',
      data: {}
    }).then((res) => {
      if (res.result.hasOwnProperty('userInfo')) {
        console.log('query voted data failed use static data instead')
        res.result = {'0101': 5, '0210': 3, '0102': 4, '0105': 1, '0106': 3}
      }
      const sortResult = this.sortVoteResult(res.result)
      wx.votedData = sortResult
      wx.userVoteData = ['', '', '', '', '']
      wx.songList = ['', '', '', '', '']
    })
  },
  //   // 排序后的数组index为4时是排名第5的歌曲信息 如{0102: 3}
  //   const albumOrder = parseInt(Object.keys(sortResult[4])[0].substr(0, 2), 10)
  //   this.setData({
  //     topSongNameIndex: parseInt(Object.keys(sortResult[4])[0].substr(2, 2), 10),
  //     topSongNameAlbumIndex: albumOrder
  //   })
  // },

  bindPickerChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      songIndex: e.detail.value
    })
  },

  nextPage: function() {
    wx.navigateTo({
      url: '../top5/top5',
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
    console.log(`voted data after sort${JSON.stringify(arr)}`)
    return arr
  }
})
