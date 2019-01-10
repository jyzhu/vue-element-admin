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
    },
    {
      path: 'fixedIncome',
      component: () => import('@/views/financing/fixedincome/index'),
      name: 'fixedIncome',
      meta: { title: '固定收益类资产', icon: 'target' }
    },
    {
      path: 'fixedIncome/details/:id',
      component: () => import('@/views/financing/fixedincome/receivePaymentDetails'),
      name: 'ReceivePaymentDetails',
      meta: { title: '固定收益类资产详情', icon: 'target' },
      hidden: true
    },
    {
      path: 'fund',
      component: () => import('@/views/financing/fund/index'),
      name: 'fund',
      meta: { title: '权益类资产', icon: 'target' }
    },
    {
      path: 'fund/details/:id',
      component: () => import('@/views/financing/fund/fundInvestmentDetails'),
      name: 'FundInvestmentDetails',
      meta: { title: '固定收益类资产详情', icon: 'target' },
      hidden: true
    }
  ]
}
export default financingRouter
