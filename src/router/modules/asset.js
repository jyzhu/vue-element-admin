import Layout from '@/views/layout/Layout'

const assetRouter = {
  path: '/asset',
  component: Layout,
  name: 'Asset',
  meta: {
    title: '资产',
    icon: '资产'
  },
  children: [
    {
      path: 'insurance',
      component: () => import('@/views/asset/insurance/index'),
      name: 'insurance',
      meta: { title: '保险资产', icon: '保险' }
    },
    {
      path: 'fixedIncome',
      component: () => import('@/views/asset/fixedincome/index'),
      name: 'fixedIncome',
      meta: { title: '固定收益类资产', icon: '债券' }
    },
    {
      path: 'fixedIncome/details/:id',
      component: () => import('@/views/asset/fixedincome/receivePaymentDetails'),
      name: 'ReceivePaymentDetails',
      meta: { title: '固定收益类资产详情' },
      hidden: true
    },
    {
      path: 'fund',
      component: () => import('@/views/asset/fund/index'),
      name: 'fund',
      meta: { title: '权益类资产', icon: '基金' }
    },
    {
      path: 'fund/details/:id',
      component: () => import('@/views/asset/fund/fundInvestmentDetails'),
      name: 'FundInvestmentDetails',
      meta: { title: '固定收益类资产详情' },
      hidden: true
    }
  ]
}
export default assetRouter
