const FATAL_REBUILD_TOLERANCE = 10
const SETDATA_SCROLL_TO_BOTTOM = {
  scrollTop: 100000,
  scrollWithAnimation: true,
}

Component({
  properties: {
    showGuide: {
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
    hasKeyboard: false
  },

  methods: {
    confirm(event) {
      this.setData({
        showGuide: false,
      })
      this.triggerEvent('guideConfirm', event.currentTarget.dataset.index)
    }
  },

  ready() {
  },
})
