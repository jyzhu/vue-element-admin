import Layout from '@/views/layout/Layout'

const planRouter = {
  path: '/plan',
  component: Layout,
  redirect: '/plan/goal',
  name: 'Plan',
  meta: {
    title: '规划',
    icon: '规划'
  },
  children: [
    {
      path: 'goal',
      component: () => import('@/views/plan/goal/index'),
      name: 'Goal',
      meta: { title: '目标', icon: '目标' }
    },
    {
      path: '7steps',
      component: () => import('@/views/plan/asset/index'),
      name: '7steps',
      meta: { title: '七步赢', icon: '自由' }
    }
  ]
}
export default planRouter
