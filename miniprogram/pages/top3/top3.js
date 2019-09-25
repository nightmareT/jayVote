//index.js
import songListArrImport from '../songList.js'
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
    pageIndex: 2,
    topSongNameIndex: wx.topSongNameIndex ? wx.topSongNameIndex : 0,
    songListArr: [],
    albumList: ['JAY', '范特西', '八度空间', '叶惠美', '七里香', '十一月的肖邦',
    '依然范特西', '我很忙', '魔杰座', '跨时代', '惊叹号', '十二新作', '哎哟，不错哦',
    '周杰伦的床边故事', '其他单曲'],
    songIndex: 0,
  },

  onLoad: function() {
    this.setData({
      songListArr: songListArrImport
    })
    this.reflectVotedData(wx.votedData, this.data.pageIndex)
  },

  reflectVotedData(sortResult, pageNum) {
    // 排序后的数组index为4时是排名第5的歌曲信息 如{0102: 3}
    const albumOrder = parseInt(Object.keys(sortResult[pageNum])[0].substr(0, 2), 10)
    this.setData({
      topSongNameIndex: parseInt(Object.keys(sortResult[pageNum])[0].substr(2, 2), 10),
      topSongNameAlbumIndex: albumOrder
    })
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

  nextPage: function() {
    const albumIndex = this.data.albumIndex - 1
    const str = `${albumIndex.toString().padStart(2, '0')
    }${this.data.songIndex.toString().padStart(2, '0')}`
    console.log(`voteData in this page is${str}`)
    wx.userVoteData[this.data.pageIndex] = str
    wx.songList[this.data.pageIndex] = `${this.data.songListArr[albumIndex][this.data.songIndex]}`
    wx.navigateTo({
      url: '../top2/top2',
    })
  }
})
