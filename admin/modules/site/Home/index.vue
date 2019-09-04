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
      { required: true, message: '请输入站点名称', trigger: 'blur' },
    ],
    domain: [
      { required: true, message: '请输入站点域名', trigger: 'blur' },
    ],
    server: [
      { required: true, message: '请选择部署的服务器', trigger: 'change' },
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
      this.$confirm('是否删除所选站点？', { type: 'warning' }).then(() => {
        this.deleteSites()
      }).catch(err => {})
    } else {
      this.$alert('请选择要删除的站点！')
    }
  },
  _Edit (site) {
    this.dlgEditVisible = true
    this.editFormData = site

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
        this.createSite()
      } else {
        return false
      }
    })
  },
  _ConfirmEdit () {
    this.$refs.editForm.validate(valid => {
      if (valid) {
        this.dlgEditVisible = false
        this.editSite(this.editFormData)
      } else {
        return false
      }
    })
  },
  _Page () {
    this.getSites()
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
      await this.getSites()
    },
    async createSite () {
      const result = await Model.createSite(this.createFormData)
      if (result) {
        this.$refs.createForm.resetFields()
        this.getSites()
      }
    },
    async getSites () {
      const result = await Model.getSites({
        ...this.page
      })
      if (result) {
        this.rules = result.list
        this.page.pageCount = result.total
      }
    },
    async deleteSites () {
      const result = await Model.deleteSites({
        ids: this.selection.map(item => item._id)
      })
      if (result) {
        this.$message('成功删除站点！')
        this.getSites()
      }
    },
    async editSite ({ _id, ...rest }) {
      const result = await Model.editSite({
        _id, 
        ...rest
      })
      if (result) {
        this.$message('成功修改站点！')
        this.getSites()
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
