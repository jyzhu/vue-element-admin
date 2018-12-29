import Layout from '@/views/layout/Layout'

const financingRouter = {
  path: '/financing',
  component: Layout,
  redirect: '/financing/goal',
  name: 'Financing',
  meta: {
    title: 'Financing',
    icon: 'Finance'
  },
  children: [
    {
      path: 'goal',
      component: () => import('@/views/financing/goal/index'),
      name: 'Goal',
      meta: { title: '理财' }
    }
  ]
}
export default financingRouter
