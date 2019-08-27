const mongoose = require('mongoose')
const db = require('../common/database')

const Schema = mongoose.Schema
const schema = new Schema({
	// 采集域
	domain: { 
		type: String, 
		required: true 
	},
	// 采集规则
	script: { 
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
