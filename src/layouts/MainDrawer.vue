<template lang='pug'>
q-drawer.q-px-md(
  :value='value'
  show-if-above
  bordered
  @input='$emit("input", $event)'
  )
  q-list
    q-item.q-my-sm(
      clickable
      v-ripple
      to='/user/profile'
    )
      q-item-section(avatar)
        q-avatar(color='blue-grey-2')
          img(v-if='avatarURL' :src='avatarURL')
          q-icon(v-else name='fas fa-user' color='white')
      q-item-section
        q-item-label.bold {{ fullName || "( Имя не задано )" }}
        q-item-label(caption lines="1") {{ email }}
      q-separator.q-mb-md
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainDrawer',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      fullName: 'user/getFullName',
      avatarURL: 'user/getAvatarUrl',
      email: 'user/getEmail'
    })
  }
}
</script>
