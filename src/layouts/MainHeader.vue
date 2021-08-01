<template lang='pug'>
q-header(elevated)
  q-toolbar
    q-btn(
      flat
      dense
      round
      icon='menu'
      aria-label='Menu'
      @click='$emit("toggle")'
    )
    q-toolbar-title {{ title }}
    div Quasar v{{ $q.version }}
    q-btn(
      icon='o_logout'
      size='md'
      flat
      round
      class='q-mx-sm gt-xs'
      @click='signOut'
    )
      q-tooltip Выход из системы
</template>

<script>
export default {
  name: 'MainHeader',
  props: {
    title: {
      type: String,
      default: 'Test app'
    }
  },
  methods: {
    async signOut () {
      const { error } = await this.$supabase.auth.signOut()
      console.log(error)
    }
  }
}
</script>
