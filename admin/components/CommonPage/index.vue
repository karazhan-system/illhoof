<template>
  <el-pagination
    layout="total, sizes, prev, pager, next, jumper"
    :current-page="value.pageIndex"
    :page-size="value.pageSize"
    :total="value.total"
    @size-change="_PageSizeChange"
    @current-change="_PageChange"
  />
</template>

<script>
export default {
  name: 'CommonPage',
  props: {
    value: {
      type: Object,
      default: () => ({
        pageIndex: 1,
        pageSize: 20,
        total: 0
      })
    }
  },
  methods: {
    _PageSizeChange (size) {
      this.$emit('input', {
        ...this.value,
        pageSize: size
      })
      this.$emit('page')
    },
    _PageChange (index) {
      this.$emit('input', {
        ...this.value,
        pageIndex: index
      })
      this.$emit('page')
    },
  },
}
</script>
