const mongoose = require('mongoose')
const db = require('../common/database')
const { getEnumValue } = require('../common/enumerate')

const Schema = mongoose.Schema
const schema = new Schema({
	// 内容标题
	title: { 
		type: String, 
		required: true 
	},
	// 采集来源域名
	domain: { 
		type: String, 
		required: true 
	},
	// 采集来源
	url: { 
		type: String, 
		required: true 
	},
	// 任务
	taskId: { 
		type: Schema.Types.ObjectId, 
		required: true 
	},
	// 标签
	tags: { 
		type: [{ type: Schema.Types.ObjectId, ref: 'Tag' }] 
	},
	// 状态
	status: { 
		type: Number, 
		default: 0 
	},
	// 数据
	data: {
		// 摘要 
		description: String,
		// 原始HTML
		raw: String,
	}
}, { 
	versionKey: false,
	timestamps: true
})

schema.virtual('statusText').get(function () {
	return getEnumValue('documentStatus', this.status)
})

// 定义Model
const model = db.model('Document', schema)

// 导出数据模型
module.exports = model
