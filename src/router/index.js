import { createRouter, createWebHistory } from "vue-router"
import Workspace from '../views/MainWorkspace.vue'
import AboutPage from '../views/AboutPage.vue'
import ModuleDetailView from '../views/ModuleDetailView.vue'
import DocumentsOutline from "@/views/DocumentsOutline.vue";

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
    },
    {
        path: "/module/projects",
        component: DocumentsOutline
    },
    {
        path: "/module/:id",
        component: ModuleDetailView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
