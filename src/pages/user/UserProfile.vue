<template lang='pug'>
q-page
  user-form(:value='user' @input='updateUser')
</template>

<script>
import UserForm from 'components/user/UserForm'
import { mapActions, mapGetters } from 'vuex'
import { loadingSpinner } from 'src/mixins'
const normalizePhone = phone => phone.replace('+7', '')
export default {
  mixins: [loadingSpinner],
  name: 'UserProfile',
  data () {
    return {
      user: {
        email: '',
        displayName: '',
        phoneNumber: '',
        photoURL: ''
      }
    }
  },
  watch: {
    currentUser (value) {
      this.setUser(value)
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/currentUser'
    })
  },
  methods: {
    ...mapActions({
      update: 'users/updateUserData',
      showError: 'logs/showError'
    }),
    async updateUser (user) {
      this.isLoading = true
      try {
        await this.update({
          id: this.currentUser.id,
          email: user.email,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber
            ? `+7${user.phoneNumber.replace(/[^0-9]/g, '')}`
            : '',
          photoURL: user.photoURL
        })
      } catch (err) {
        this.showError(err)
      } finally {
        this.isLoading = false
      }
    },
    setUser (user) {
      this.user.email = user?.email || ''
      this.user.displayName = user?.displayName || ''
      this.user.photoURL = user?.photoURL
      this.user.phoneNumber = normalizePhone(user?.phoneNumber || '')
    }
  },
  mounted () {
    this.setUser(this.currentUser)
  },
  components: {
    UserForm
  }
}
</script>
