import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },         
                {
                    path: '/userCenter',
                    component: resolve => require(['../components/page/UserCenter.vue'], resolve)    // 拖拽列表组件 
                },
                {
                    path: '/modifyUser',
                    component: resolve => require(['../components/page/ModifyUser.vue'], resolve)
                },
                {
                    path: '/modifyPassword',
                    component: resolve => require(['../components/page/ModifyPassword.vue'], resolve)
                },
                {
                    path: '/success',
                    component: resolve => require(['../components/page/Success.vue'], resolve)
                },
                {
                    path: '/finduser',
                    component: resolve => require(['../components/page/user/FindUser.vue'], resolve)
                },
                {
                  path: '/findcategory',
                  component:resolve=>require(['../components/page/category/FindCategory.vue'],resolve)
                },
                {
                    path: '/findShop',
                    component:resolve=>require(['../components/page/shop/FindShop.vue'],resolve)
                  },
                  {
                    path: '/findStock',
                    component:resolve=>require(['../components/page/stock/FindStock.vue'],resolve)
                  },
                  {
                    path: '/findDeliver',
                    component:resolve=>require(['../components/page/deliver/FindDeliver.vue'],resolve)
                  }
            ]
        },
        {
            path: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
        },
        {
            path: '/register-success',
            component: resolve => require(['../components/page/RegisterSuccess.vue'], resolve)
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
       

    ],
    mode: 'history'
})
