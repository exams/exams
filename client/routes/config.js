export default {
    menus: [    // 菜单相关路由
        { route: '/app/dashboard/index', key: 'home', title: '首页', icon: 'home', component: 'Dashboard' },
        {
            route: '/app/template', key: 'template', title: '模板', icon: 'snippets', component: 'Templates'
        },
        {
            route: '/app/papers', key: 'paper', title: '试卷', icon: 'file-text', component: 'Papers'
        },
        {
            route: '/app/quests', key:'quests',  title: '题库', icon: 'star', component: 'Quests'
        },
        {
            route: '/app/subjects', key: 'subject', title: '科目', icon: 'cluster', component: 'Subjects'
        },
        {
            route: '/app/users', key: 'user', title: '用户', icon: 'user', component: 'Users'
        },
        {
            route: '/subs4', key: 'page', title: '页面', icon: 'switcher',
            subs: [
                { route: '/login', key: 'signIn', title: '登录' },
                { route: '/404', key: 'notFound', title: '404' },
            ],
        },
        {
            route: '/app/auth', key: 'permissionManage', title: '权限管理', icon: 'safety',
            subs: [
                { route: '/app/auth/basic', key: 'basic', title: '基础演示', component: 'AuthBasic' },
                { route: '/app/auth/routerEnter', key: 'routeIntercept', title: '路由拦截', component: 'RouterEnter', auth: 'user' },
            ],
        }
    ],
    others: [
        {
            route: '/app/template/create', key: 'template', title: '模板', component: 'Template'
        },
        {
            route: '/app/papers/create', title: '试卷', component: 'Paper'
        },
        {
            route: '/app/records', visible: false, key: 'record', title: '录入', component: 'Records'
        },
    ]  // 非菜单相关路由
}
