const mongoose = require('mongoose')
const db = require('../common/database')

const Schema = mongoose.Schema
const schema = new Schema({
	// 服务器名称
	name: { 
		type: String, 
		required: true 
	},
	// 服务器ip
	ip: { 
		type: String, 
		required: true 
	},
	// 服务器账户
	account: { 
		type: String, 
		default: 'root' 
	},
	// 服务器密码
	passwd: { 
		type: String, 
		required: true 
	},
}, { 
	versionKey: false,
	timestamps: true 
})

// 定义Model
const model = db.model('Rule', schema)

// 导出数据模型
module.exports = model
