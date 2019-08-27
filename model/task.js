const mongoose = require('mongoose')
const db = require('../common/database')
const { getEnumValue } = require('../common/enumerate')

const Schema = mongoose.Schema
const schema = new Schema({
	// 任务名称
	name: {
		type: String,
		required: true
	},
	// 目标采集域
	domain: { 
		type: String, 
		required: true 
	},
	// 入口
	entries: [{ type: String }],
	// 定时采集状态
	cron: {
		type: Boolean,
		default: false
	},
	// 最近执行时间
	executedAt: Date,
	// 状态
	status: { 
		type: Number, 
		default: 0
	},
}, { 
	versionKey: false,
	timestamps: true 
})

schema.virtual('statusText').get(function () {
	return getEnumValue('taskStatus', this.status)
})

// 定义Model
const model = db.model('Task', schema)

// 导出数据模型
module.exports = model
