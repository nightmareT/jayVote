//app.js
App({
  onLaunch: async function () {
    console.log('1111')
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      console.log('2222')
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
      // await wx.cloud.callFunction({
      //   name: 'getVoteResult',
      //   data: {}
      // }).then((res) => {
      //   if (res.result.hasOwnProperty('userInfo')) {
      //     console.log('query voted data failed use static data instead')
      //     res.result = {'0101': 5, '0210': 3, '0102': 4, '0105': 1, '0106': 3}
      //   }
      //   console.log(new Date())
      //   const sortResult = this.sortVoteResult(res.result)
      //   this.reflectVotedData(sortResult)
      // })
    }
    this.globalData = {}
  },
  reflectVotedData: function(sortResult) {
    // 排序后的数组index为4时是排名第5的歌曲信息 如{0102: 3}
    const albumOrder = parseInt(Object.keys(sortResult[3])[0].substr(0, 2), 10)
    wx.topSongNameIndex = parseInt(Object.keys(sortResult[3])[0].substr(2, 2), 10)
    wx.topSongNameAlbumIndex = albumOrder
    // this.setData({
    //   topSongNameIndex: parseInt(Object.keys(sortResult[4])[0].substr(2, 2), 10),
    //   topSongNameAlbumIndex: albumOrder
    // })
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
