<template lang='pug'>
q-page(padding)
  h5.text-center.text-primary.q-mt-lg Восстановление пароля
  q-form.authentication.q-px-md.q-gutter-y-sm(ref='changePasswordForm' @submit='onSubmit')
    q-input(
      v-model='password'
      lazy-rules
      outlined
      color='primary'
      label='Новый пароль'
      :rules='[val => !!val || "Введите новый пароль"]'
      :type='isPwd ? "password" : "text"'
      @keyup.enter='onSubmit'
    )
      template(v-slot:prepend)
        q-icon(name='fas fa-lock')
      template(v-slot:append)
        q-icon.cursor-pointer(
          :name='isPwd ? "visibility_off" : "visibility"'
          @click='isPwd = !isPwd'
        )
      q-tooltip Введите новый пароль
    q-input(
      lazy-rules
      outlined
      color="primary"
      label="Новый пароль повторно"
      v-model="passwordMatch"
      :rules='[ val => !!val || "Введите новый пароль повторно", val => val === password || "Пароли не совпадают" ]'
      :type="isPwd ? 'password' : 'text'"
      @keyup.enter='onSubmit'
    )
      template(v-slot:prepend)
        q-icon(name='fas fa-lock')
      template(v-slot:append)
        q-icon.cursor-pointer(
          :name='isPwd ? "visibility_off" : "visibility"'
          @click='isPwd = !isPwd'
        )
      q-tooltip Повторите ввод нового пароля
    q-btn.full-width.q-mt-sm(
      color='primary'
      padding='md xs'
      type='submit'
      icon='fas fa-key'
      label='Сменить пароль'
      )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { loadingSpinner } from '../mixins'
export default {
  name: 'ChangePassword',
  mixins: [loadingSpinner],
  data () {
    return {
      isPwd: true,
      password: null,
      passwordMatch: null
    }
  },
  computed: {
    ...mapGetters({
      accessToken: 'auth/accessToken'
    })
  },
  methods: {
    ...mapActions({
      showError: 'logs/showError',
      showInfo: 'logs/showInfor'
    }),
    onSubmit () {
      const { password } = this
      this.$refs.changePasswordForm.validate()
        .then(async success => {
          if (!success) return
          this.isLoading = true
          try {
            const { error } = await this.$supabase.auth.api.updateUser(this.accessToken, { password })
            if (error) throw new Error(error)
          } catch (err) {
            this.showError(err)
          } finally {
            this.isLoading = false
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
  .authentication {
    margin: auto;
    max-width: 25rem;
    width: 100%;
  }
</style>
