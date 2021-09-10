<template lang='pug'>
q-page.flex.flex-center
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  props: {
    accessToken: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'none'
    }
  },
  mounted () {
    console.log(this.$route)
  }
})
</script>
