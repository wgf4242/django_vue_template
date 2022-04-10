import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";

const routes:Array<RouteRecordRaw> = [
    {path: "/", redirect: {name: "Home"}, meta: {title: "主页"}},
    {path: "/home", name: "Home", component: () => import("@/views/home/Home.vue"), meta: {title: "主页", isLogin: true}},
    {path: "/login", name: "Login", component: () => import("../views/login/Login.vue"), meta: {title: "登录"},},
    { path: '/:pathMatch(.*)*',
        redirect: '/404',
        hidden: true,
        // name: 'NotFound', component: NotFound },
    }
];


const router:Router = createRouter({
    history: createWebHistory(),
    routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const profilePath = "/dashboard/profile";

    (window as any).document.title = to.meta.title || "主页";
    if (!to.matched.some(res => res.meta.isLogin)) {//判断是否需要登录
        return next();
    }

    if (!localStorage["currentUser"])
        return next({path: "/login", query: {redirect: to.fullPath}});

    return next();
});
export default router;
