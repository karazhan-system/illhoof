<template>
  <div class="header">
    <div class="layout-header">
      <div class="layout-logo">
        Karazhan Illhoof
      </div>
      <ul class="layout-nav">
        <li v-for="(item, index) in nav" :key="index" @click="$router.push(item.path)" :class="{'active': current === index }">
          <span :class="`icon i-${item.icon}`"></span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
      <div class="layout-top">
        <div>
          <span class="icon i-user"></span>
          <span>admin</span>
        </div>
        <div>
          <span class="icon i-power"></span>
          <span>退出</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      current: 0,
      nav: [
        { title: '站点', path: '/site', icon: 'site' },
        { title: '服务器', path: '/server', icon: 'server' },
      ],
    }
  },
  watch: {
    $route: {
      handler () {
        this.setNavStyle()
      },
      deep: true
    }
  },
  methods: {
    setNavStyle () {
      this.nav.forEach((item, idx) => {
        if (this.$route.path.match(item.path)) {
          this.current = idx
        }
      })
    }
  },
  created () {
    this.setNavStyle()
  }
} 
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/define.styl'

@font-face{
  font-family: 'logo';
  src: url('~@/assets/font/ruler2/Ruler Heavy.ttf') format('truetype')
}

.header{
  width 100%
  background $primary; 

  >.layout-header{
    display flex
    
    >.layout-logo{
      height 48px
      line-height 48px
      color #fff;
      font-family: logo!important;
      margin: 0 16px;
    }

    >.layout-nav{
      flex auto
      height: 48px;
      display: flex
      align-items: center
      list-style: none
      margin: 0 16px;

      >li{
        color: rgba(255,255,255,0.8);
        padding 0 16px
        cursor pointer
        height 48px
        line-height 48px
        font-size 14px

        >.icon{
          margin-right 8px;
        }

        &:hover{
          color #fff;
          background rgba(0,0,0,0.1)
        }

        &.active{
          color #fff;
          background rgba(0,0,0,0.1);
        }
      }
    }

    >.layout-top{
      height: 48px;
      display: flex
      align-items: center
      font-size: 14px;
      margin: 0 16px;

      >div{
        margin-left 16px
        cursor pointer
        span{
          color: rgba(255,255,255,0.8);
        }
        .icon{
          margin-right 8px
          font-size: 16px;
        }

        &:hover{
          span{
            color: #fff
          }
        }
      }

      
    }
  }
}

</style>
