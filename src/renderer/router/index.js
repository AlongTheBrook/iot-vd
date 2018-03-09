import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main-frame',
      name: 'main-frame',
      component: require('@/components/MainFrame').default,
      children: [
        {
          path: 'device-frame',
          name: 'device-frame',
          component: require('@/components/MainFrame/DeviceFrame').default,
          children: [
            {
              path: 'device',
              name: 'device',
              component: require('@/components/MainFrame/DeviceFrame/Device').default
            }
          ]
        },
        {
          path: 'history-frame',
          name: 'history-frame',
          component: require('@/components/MainFrame/HistoryFrame').default
        },
        {
          path: 'more-frame',
          name: 'more-frame',
          component: require('@/components/MainFrame/MoreFrame').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/main-frame'
      // component: require('@/components/LandingPage').default
    }
  ]
})
