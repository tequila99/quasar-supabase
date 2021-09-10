<template lang='pug'>
q-layout(view="lHh Lpr lFf")
  MainHeader(
    :title='title'
    :version='version'
    @toggle='toggleLeftDrawer'
    )
  MainDrawer(v-model='leftDrawerOpen')
  //- q-drawer(
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    class="bg-grey-1"
    )
    q-list
  q-page-container(style='height: 100vh !important;')
    router-view
</template>

<script>
import MainHeader from 'layouts/MainHeader.vue'
import MainDrawer from 'layouts/MainDrawer.vue'
import * as packageJson from '../../package.json'
const { productName, version } = packageJson

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MainHeader, MainDrawer
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      title: productName,
      version,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
