//index.js
import utils from '../../utils/index'
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
    touchx: 0,
    touchy: 0,
    topSongNameAlbumIndex: -1,
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
    this.reflectVotedData(wx.votedData, 4)
  },

  touchStart(e) {
    // console.log(e)
    this.setData({
      touchx: e.changedTouches[0].clientX,
      touchy: e.changedTouches[0].clientY
    });
  },

  touchEnd(e) {
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    if (utils.getTouchData(x, y, this.data.touchx, this.data.touchy) === 'left' ) {
      this.nextPage()
    }
  },

  reflectVotedData(sortResult, pageNum) {
    // 排序后的数组index为4时是排名第5的歌曲信息 如{0102: 3}
    const albumOrder = parseInt(Object.keys(sortResult[pageNum])[0].substr(0, 2), 10)
    this.setData({
      topSongNameIndex: parseInt(Object.keys(sortResult[pageNum])[0].substr(2, 2), 10),
      topSongNameAlbumIndex: albumOrder,
      albumIndex: wx.userVoteData && wx.userVoteData[pageNum] ? (parseInt(wx.userVoteData[pageNum].substr(0, 2), 10) + 1) : 1,
      songIndex: wx.userVoteData && wx.userVoteData[pageNum] ? parseInt(wx.userVoteData[pageNum].substr(2, 2), 10): 0,
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
    wx.userVoteData[4] = str
    wx.songList[4] = `${this.data.songListArr[albumIndex][this.data.songIndex]}`
    wx.navigateTo({
      url: '../top4/top4',
    })
  }
})
