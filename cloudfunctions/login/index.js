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
	// collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结
	const result = await db.collection('vote').get()
	debugger
	console.log(`result.data${JSON.stringify(result.data)}`)
	// event.params ['0101']
	// result.data[0] = {'0101': 0, 'id': 01}
	for (let i = 0; i < event.params.length; i ++) {
		for (let key in result.data[0]) {
			console.log(`key${i}is${key}`)
			if (key === event.params[i]) {
				if (typeof result.data[0][key] !== 'number') {
					result.data[0][key] = 0
				}
				result.data[0][key] ++
			}
		}
	}
	debugger
	// console.log(`result.data${JSON.stringify(result.data)}`)
	// const update = await db.collection('vote').update({
	// 	data: [result.data[0]]
	// })
	// console.log(update.data)
}

