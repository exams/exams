export default {
    menus: [    // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/template', title: '模板', icon: 'star', component: 'PaperTemplate'
        },
        {
            key: '/app/papers', title: '试卷', icon: 'star', component: 'Papers'
        },
        {
            key: '/app/papers/:id', visible: false, title: '试卷', icon: 'star', component: 'Paper'
        },
        {
            key: '/subs4', title: '页面', icon: 'switcher',
            subs: [
                { key: '/login', title: '登录' },
                { key: '/404', title: '404' },
            ],
        },
        {
            key: '/app/auth', title: '权限管理', icon: 'safety',
            subs: [
                { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
                { key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'user' },
            ],
        }
    ],
    others: []  // 非菜单相关路由
}
