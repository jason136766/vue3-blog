import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from "vue-router";
import storage from "../utils/storage";

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
        component: () => import('../views/articles/Show.vue')
    },
    {
        path: '/articles/create',
        name: 'articles.create',
        component: () => import('../views/articles/Form.vue'),
    },
    {
        path: '/articles/edit/:id(\\d+)',
        name: 'articles.edit',
        component: () => import('../views/articles/Form.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

