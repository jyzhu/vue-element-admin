import Layout from '@/views/layout/Layout'

const financingRouter = {
  path: '/financing',
  component: Layout,
  redirect: '/financing/goal',
  name: 'Financing',
  meta: {
    title: '理财',
    icon: 'Finance'
  },
  children: [
    {
      path: 'goal',
      component: () => import('@/views/financing/goal/index'),
      name: 'Goal',
      meta: { title: '目标', icon: 'target' }
    },
    {
      path: 'asset',
      component: () => import('@/views/financing/asset/index'),
      name: 'Asset',
      meta: { title: '资产', icon: 'target' }
    }
  ]
}
export default financingRouter
