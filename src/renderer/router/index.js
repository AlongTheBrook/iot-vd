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
        }
      ]
    },
    {
      path: '*',
      redirect: '/main-frame/device-frame/device'
      // component: require('@/components/LandingPage').default
    }
  ]
})
