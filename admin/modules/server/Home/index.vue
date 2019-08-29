<template src="./view.html"></template>
<style lang="stylus" scoped src="./view.styl"></style>

<script>
import Model from '../model.js'
import Mixin from '@/mixins'

// 状态
const state = {
  dlgCreateVisible: false,
  dlgEditVisible: false,
  createFormData: {},
  editFormData: {},
  formRules: {
    name: [
      { required: true, message: '请输入采集规则的目标域名', trigger: 'blur' },
    ],
    ip: [
      { required: true, message: '请输入采集规则的目标域名', trigger: 'blur' },
    ],
    passwd: [
      { required: true, message: '请输入采集规则的目标域名', trigger: 'blur' },
    ],
  },
  selection: [],
  rules: []
}

// 事件
const events = {
  _Create () {
    this.dlgCreateVisible = true
    this.$nextTick(() => {
      this.$refs.createForm.clearValidate()
    })
  },
  _Delete () {
    if (this.selection.length) {
      this.$confirm('是否删除所选服务器？', { type: 'warning' }).then(() => {
        this.deleteServers()
      }).catch(err => {})
    } else {
      this.$alert('请选择要删除的服务器！')
    }
  },
  _Edit (server) {
    this.dlgEditVisible = true
    this.editFormData = server

    this.$nextTick(() => {
      this.$refs.editForm.clearValidate()
    })
  },
  _Select (selection) {
    this.selection = selection
  },
  _ConfirmCreate () {
    this.$refs.createForm.validate(valid => {
      if (valid) {
        this.dlgCreateVisible = false
        this.createServer()
      } else {
        return false
      }
    })
  },
  _ConfirmEdit () {
    this.$refs.editForm.validate(valid => {
      if (valid) {
        this.dlgEditVisible = false
        this.editServer(this.editFormData)
      } else {
        return false
      }
    })
  },
  _Page () {
    this.getServers()
  },
} 

export default {
  mixins: [
    Mixin.options,
    Mixin.page
  ],
  data () {
    return state
  },
  methods: {
    ...events,
    async init () {
      await this.getServers()
    },
    async createServer () {
      const result = await Model.createServer(this.createFormData)
      if (result) {
        this.$refs.createForm.resetFields()
        this.getServers()
      }
    },
    async getServers () {
      const result = await Model.getServers({
        ...this.page
      })
      if (result) {
        this.rules = result.list
        this.page.pageCount = result.total
      }
    },
    async deleteServers () {
      const result = await Model.deleteServers({
        ids: this.selection.map(item => item._id)
      })
      if (result) {
        this.$message('成功删除服务器！')
        this.getServers()
      }
    },
    async editServer ({ _id, ...rest }) {
      const result = await Model.editServer({
        _id, 
        ...rest
      })
      if (result) {
        this.$message('成功修改服务器！')
        this.getServers()
      }
    }
    
  },
  created () {
    this.init()
  },
  mounted () {

  }
}
</script>
