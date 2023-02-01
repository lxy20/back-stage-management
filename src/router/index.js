import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'

Vue.use(VueRouter)
//1创建路由组件
//2将路由和组件进行映射

const routes = [
    //主路由
    {
        path:'/',
        component:Main,
        name:'Main',
        redirect:'/home', //重定向
        children:[

        ]
    },
    {
      path:'/login', 
      component:Login,
      name:'login'
    }

  ]

  const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })

  export function resetRouter(){
    const newRouter =  new VueRouter({
      routes // (缩写) 相当于 routes: routes
    })

    router.matcher = newRouter.matcher
  }

  export default router
