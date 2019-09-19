const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
}

Component({
  properties: {
    showVoteModal: {
      type: Boolean,
      value: true
    },
    collection: String,
    groupId: String,
    groupName: String,
    userInfo: Object,
    onGetUserInfo: {
      type: Function,
    },
    getOpenID: {
      type: Function,
    },
  },

  data: {
    chats: [],
    textInputValue: '',
    openId: '',
    scrollTop: 0,
    scrollToMessage: '',
    hasKeyboard: false,
    albumList: ['JAY', '范特西', '八度空间', '叶惠美', '七里香'],
    // albumSelectIndex: 0,
  },

  methods: {
    confirmAlbum(event) {
      console.log(`albumSelectIndex${event.currentTarget.dataset.index}`)
      // this.albumSelectIndex = event.currentTarget.dataset.index
      this.setData({
        showVoteModal: false,
      })
      this.triggerEvent('updateAlbum', event.currentTarget.dataset.index)
    }
  },

  ready() {
  },
})
