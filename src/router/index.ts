import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/php',
        name: 'php',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/golang',
        name: 'golang',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/articles/:id(\\d+)',
        name: 'articles',
        component: () => import('../views/Article.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

