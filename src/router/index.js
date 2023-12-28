import { createRouter, createWebHistory } from "vue-router"
import Workspace from '../views/MainWorkspace.vue'
import AboutPage from '../views/AboutPage.vue'
import ModuleDetailView from '../views/ModuleDetailView.vue'
import DocumentContainer from '../views/DocumentContainer.vue'
import ViewOutline from "@/views/ViewOutline.vue";

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
        component: ViewOutline
    },
    {
        path: "/module/:id",
        component: ModuleDetailView
    },
    {
        path: "/projects/:id",
        component: DocumentContainer,
        meta: { type: 'project' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
