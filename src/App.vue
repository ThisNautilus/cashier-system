<template>
  <div id="app">
    <!-- 左侧导航栏 -->
    <leftNav></leftNav>
    <!-- 操作区域 -->
    <div class="main">
      <!-- 用于渲染路由匹配到的组件 -->
      <!-- 此处匹配到的为Post.vue 加div进行布局 -->
      <router-view/>
    </div>
  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav.vue'

export default {
  name:'app',
  components:{
    leftNav
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  float: left;
  width: 95%;
  background-color: #EFF2F7;
  height: 100%;
  overflow: hidden;
}
</style>
