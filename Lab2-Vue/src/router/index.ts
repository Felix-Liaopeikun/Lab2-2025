import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import EventView from '../views/EventView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import StudentListView from '../views/StudentListView.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/event/:id', name: 'event', component: EventView, props: true },
    { path: '/students', name: 'students', component: StudentListView },
    { path: '/network-error', name: 'network-error', component: NetworkErrorView },
    { path: '/404', name: '404', component: NotFoundView, props: route => ({ resource: route.query.resource }) },
    { path: '/:pathMatch(.*)*', component: NotFoundView }
  ]
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router