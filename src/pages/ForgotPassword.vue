<template lang='pug'>
q-page(padding)
  h5.text-center.text-primary.q-mt-lg Восстановление пароля
  q-form.authentication.q-px-md.q-gutter-y-sm(ref='forgotPasswordForm' @submit="onSubmit")
    p.q-mb-lg Пожалуйста введите адрес электронной почты. Не него будет выслана ссылка для сброса пароля.
    q-input(
      v-model='email'
      outlined
      color='primary'
      label='Email'
      lazy-rules
      :rules='[val => !!val || "Введите адрес электронной почты"]'
      )
      template(v-slot:prepend)
        q-icon(name='far fa-envelope')
      q-tooltip Введите адрес электронной почты который использовался для входа в систему
    q-btn.full-width.q-mt-sm(
      color='primary'
      data-cy='submit'
      padding='md xs'
      label='Сбросить пароль'
      type='submit'
    )
</template>

<script>
import { mapActions } from 'vuex'
import { loadingSpinner } from '../mixins'

export default {
  mixins: [loadingSpinner],
  name: 'ForgotPassword',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions({
      showInfo: 'logs/showInfo',
      showError: 'logs/showError'
    }),
    onSubmit () {
      this.$refs.forgotPasswordForm.validate()
        .then(async success => {
          if (success) {
            this.isLoading = true
            try {
              const { error } = await this.$supabase.auth.api.resetPasswordForEmail(this.email)
              if (error) throw new Error(error)
              this.showInfo('Письмо со ссылкой для сброса пароля отправлено на указанынй адрес')
              // this.$router.push({ path: '/auth/login' })
            } catch (err) {
              this.showError('Произошла ошибка при попытке отправить письмо для сброса пароля')
            } finally {
              this.isLoading = false
            }
          }
        })
    }
  }
}
</script>

<style lang="scss">
.authentication {
  margin: auto;
  max-width: 25rem;
  width: 100%;
}
</style>
