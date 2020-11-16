<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'readme',
                        title: '简介'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'userCenter',
                        title: '设置',
                        subs: [
                            {
                                index: 'upload',
                                title: '文件上传'
                            },
                            {
                                index: 'modifyUser',
                                title: '修改用户'
                            }
                        ]
                    },
                    {
                         icon: 'el-icon-edit',
                         index: 'User',
                         title: '用户管理',
                         subs: [
                            {  index: 'finduser',
                               title: '查询用户'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-view',
                        index: 'category',
                        title: '分类管理',
                        subs:[
                            {
                                index: 'findcategory',
                                title: '分类查找'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'shop',
                        title:'商品管理',
                        subs:[
                            {
                                index: 'findShop',
                                title:'商品查找'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'stock',
                        title: '进货管理',
                        subs:[{
                            index: 'findStock',
                            title:'进货查找'
                        }]
                    },
                    {
                        icon: 'el-icon-view',
                        index: 'deliver',
                        title:'出货管理',
                        subs:[{
                            index: 'findDeliver',
                            title: '出货查找'
                        }]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
