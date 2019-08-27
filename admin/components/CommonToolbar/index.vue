<template>
  <div class="common-toolbar" :class="{'common-toolbar-border' : border}">
    <div class="toolbar-left">
      <slot name="left"></slot>
    </div>
    <div class="toolbar-right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonToolbar',
  props: {
    border: {
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/define.styl'

.common-toolbar{
  display flex
  justify-content space-between
  align-items center

  padding: 8px 16px;

  &.common-toolbar-border{
    border-bottom: 1px solid $border;
    $shadow();
  }

  >.toolbar-left{
    display: flex;
    font-size: 14px; 
    >*{
      margin-right 8px;
    }
  }
  >.toolbar-right{
    display: flex;
    .el-button+.el-button{
      margin-left: 8px;
    }
  }
}
</style>
