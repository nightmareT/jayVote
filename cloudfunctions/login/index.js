// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
	const db = cloud.database()
	const result = await db.collection('vote').get()
  if (typeof result.data[1].voteNum === 'number') {
    result.data[1].voteNum ++
  }
  delete result.data[0]._id
  delete result.data[1]._id
	for (let i = 0; i < event.params.length; i ++) {
    if (!result.data[0].hasOwnProperty(event.params[i])) {
			result.data[0][event.params[i]] = 0
		}
		for (let key in result.data[0]) {
			console.log(`key${i}is${key}`)
			if (key === event.params[i]) {
				if (typeof result.data[0][key] !== 'number') {
					result.data[0][key] = 0
				}
				result.data[0][key] += 1
			}
		}
	}
  await db.collection('vote').doc('count').update({
    data: result.data[1]
  })
  const update = await db.collection('vote').doc('voteObj').update({
		data: result.data[0]
	})
}

