import { createRouter, createWebHistory } from "vue-router"
import Workspace from '../views/MainWorkspace.vue'
import AboutPage from '../views/AboutPage.vue'

const routes = [
    {
        path: "/",
        component: Workspace
    },
    {
        path: "/workspace",
        component: Workspace
    },
    {
        path: "/about",
        component: AboutPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
