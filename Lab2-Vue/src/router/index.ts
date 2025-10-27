import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import EventDetailView from '../views/event/DetailView.vue'
import EventRegisterView from '../views/event/RegisterView.vue'
import EventEditView from '../views/event/EditView.vue'
import EventLayoutView from '../views/event/LayoutView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import StudentListView from '../views/StudentListView.vue'
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, props: route => ({ page: parseInt(route.query.page?.toString() || '1') }) },
    { path: '/about', name: 'about', component: AboutView },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
          .then((response) => {
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true
        }
      ]
    },
    { path: '/students', name: 'students', component: StudentListView },
    { path: '/network-error', name: 'network-error-view', component: NetworkErrorView },
    { path: '/404/:resource', name: '404-resource-view', component: NotFoundView, props: true },
    { path: '/:catchAll(.*)', name: 'not-found', component: NotFoundView }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router