import Vue from 'vue'
import Router from 'vue-router'
import upload from '@/components/upload'
import barGraph from '@/components/barGraph'
import lineGraph from '@/components/lineGraph'
import pieGraph from '@/components/pieGraph'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },

    {
      path: '/barGraph',
      name: 'barGraph',
      component: barGraph
    },

    {
    	path: '/lineGraph',
    	name: 'lineGraph',
    	component: lineGraph
    },

    {
    	path: '/pieGraph',
    	name: 'pieGraph',
    	component: pieGraph
    },
  ]
})
