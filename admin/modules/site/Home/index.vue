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
    domain: [
      { required: true, message: '请输入采集规则的目标域名', trigger: 'blur' },
    ],
    script: [
      { required: true, message: '请设置采集规则', trigger: 'change' },
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
      this.editor = this.createEditor()
    })
  },
  _Delete () {
    if (this.selection.length) {
      this.$confirm('是否删除所选规则？', { type: 'warning' }).then(() => {
        this.deleteRules()
      }).catch(err => {})
    } else {
      this.$alert('请选择要删除的规则！')
    }
  },
  _EditRule (rule) {
    this.dlgEditVisible = true
    this.editFormData = rule

    this.$nextTick(() => {
      this.$refs.editForm.clearValidate()
      this.editor = this.createEditor()
      this.editor.setValue(rule.script)
    })
  },
  _Select (selection) {
    this.selection = selection
  },
  _ConfirmCreate () {
    this.$set(this.createFormData, 'script', this.editor.getValue())
    
    this.$refs.createForm.validate(valid => {
      if (valid) {
        this.dlgCreateVisible = false
        this.editor.dispose()
        this.createRule()
      } else {
        return false
      }
    })
  },
  _ConfirmEdit () {
    this.$set(this.editFormData, 'script', this.editor.getValue())

    this.$refs.editForm.validate(valid => {
      if (valid) {
        this.dlgEditVisible = false
        this.editor.dispose()
        this.editRule(this.editFormData)
      } else {
        return false
      }
    })
  },
  _Page () {
    this.getRules()
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
    createEditor () {
      return monaco.editor.create(this.$refs.editor, {
        theme: 'vs-dark',
        fontSize: '14px',
        fontWeight: '500',
        language: 'javascript'
      })
    },
    async init () {
      await this.getRules()
    },
    async createRule () {
      const result = await Model.createRule(this.createFormData)
      if (result) {
        this.$refs.createForm.resetFields()
        this.getRules()
      }
    },
    async getRules () {
      const result = await Model.getRules({
        ...this.page
      })
      if (result) {
        this.rules = result.list
        this.page.pageCount = result.total
      }
    },
    async deleteRules () {
      const result = await Model.deleteRules({
        ids: this.selection.map(item => item._id)
      })
      if (result) {
        this.$message('成功删除任务！')
        this.getRules()
      }
    },
    async editRule ({ _id, ...rest }) {
      const result = await Model.editRule({
        _id, 
        ...rest
      })
      if (result) {
        this.$message('成功修改任务！')
        this.getRules()
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
