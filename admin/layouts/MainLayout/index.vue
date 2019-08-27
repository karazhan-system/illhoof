<template>
  <div class="layout">
    <Header/>
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '~@/assets/css/define.styl';
.layout{
  height: 100%;
  display: flex;
  flex-direction: column;

  >.layout-content{
    flex auto
  }
}
</style>

<script>
import Header from './components/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
