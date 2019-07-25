import Vue from 'vue'
import Router from 'vue-router'
// 导入入口组件Post.vue
import Post from './components/page/Post.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'post',
        component: Post
    }]
})