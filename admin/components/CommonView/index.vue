<template>
  <div class="common-view">
    <div class="common-view-top" ref="top">
      <slot name="top"></slot>
    </div>
    <div class="common-view-main" ref="content">
      <slot></slot>
    </div>
    <div class="common-view-bottom" ref="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonView',
  methods: {
    setHeight () {
      const topHeight = this.$refs.top.offsetHeight
      const bottomHeight = this.$refs.bottom.offsetHeight
      this.$refs.content.style.height = this.$el.offsetHeight - topHeight - bottomHeight + 'px'
      
    },
  },
  mounted () {
    this.setHeight()
    window.addEventListener('resize', () => {
      this.setHeight()
    })
  }

}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/define.styl'
  
.common-view{
  height 100%
  display: flex;
  flex-direction column
  position relative

  >.common-view-top{
    position: relative;
    z-index: 10;
  }

  >.common-view-main{
    overflow-y auto;
    position: relative;
  }

  >.common-view-bottom{
    text-align right 
  }
}
</style>

