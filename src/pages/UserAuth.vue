<template lang='pug'>
q-page(padding)
  h5.text-center.text-primary.q-mt-lg {{ getAuthTitle }}
  q-form.authentication.q-px-md.q-gutter-y-sm(ref='emailAuthenticationForm' @submit='onSubmit')
    q-input(
      v-model='email'
      outlined
      color='primary'
      lazy-rules
      label='Email'
      type='email'
      :rules='[val => !!val || "Введите адрес электронной почты"]'
      )
        template(v-slot:prepend)
          q-icon(name='far fa-envelope')
        q-tooltip Введите адрес электронной почты в качестве логина для входа в программу
    q-input(
      v-model='password'
      lazy-rules
      outlined
      color='primary'
      label='Пароль'
      :rules='[val => !!val || "Введите пароль"]'
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
      q-tooltip {{ isRegistration ? 'Укажите пароль для регистрации в программе' : 'Введите пароль для входа в программу'}}
    q-input(
      v-if='isRegistration'
      lazy-rules
      outlined
      color="primary"
      label="Пароль повторно"
      v-model="passwordMatch"
      :rules='[ val => !!val || "Введите пароль повторно", val => val === password || "Пароли не совпадают" ]'
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
      q-tooltip Повторите ввод пароля для регистрации в программе
    q-btn.full-width.q-mt-sm(
      color='primary'
      padding='md xs'
      type='submit'
      :icon='isRegistration ? "fas fa-user-plus" : "fas fa-sign-in-alt"'
      :label='getAuthButtonLabel'
      )
    q-btn.full-width.q-mt-sm(
      color='secondary'
      padding='md xs'
      label='Войти с помощью Google'
      icon='fab fa-google'
      @click='handleLoginProvider("google")'
      )
    q-btn.full-width.q-mt-sm(
      color='dark'
      padding='md xs'
      label='Войти с помощью Github'
      icon='fab fa-github'
      @click='handleLoginProvider("github")'
      )
    .q-ml-lg.q-mt-lg.text-weight-medium
      p
        router-link.text-blue(:to='routeAuthentication')
          span(v-if='isRegistration') У меня есть учетная запись
          span(v-else) Создать новый аккаунт
      p
        router-link.text-blue(to='forgot-password') Я не помню пароль
</template>

<script>
import { mapActions } from 'vuex'
import { loadingSpinner } from '../mixins'
export default {
  mixins: [loadingSpinner],
  name: 'UserAuth',
  computed: {
    getAuthTitle () {
      return this.isRegistration ? 'Регистрация в программе' : 'Вход в программу'
    },
    getAuthButtonLabel () {
      return this.isRegistration ? 'Зарегистрироваться' : 'Войти'
    },
    isRegistration () {
      return this.$route.name === 'Register'
    },
    routeAuthentication () {
      return this.isRegistration ? '/auth/login' : '/auth/register'
    }
  },
  data () {
    return {
      email: null,
      isPwd: true,
      password: null,
      passwordMatch: null
    }
  },
  methods: {
    ...mapActions({
      showError: 'logs/showError'
    }),
    onSubmit () {
      const { email, password } = this
      this.$refs.emailAuthenticationForm.validate()
        .then(async success => {
          if (!success) return
          this.isLoading = true
          try {
            if (this.isRegistration) {
              const { error } = await this.$supabase.auth.signUp({ email, password })
              if (error) throw new Error(error)
            } else {
              const { error } = await this.$supabase.auth.signIn({ email, password })
              if (error) throw new Error(error)
            }
            // this.$nextTick(() => this.$router.push({ path: '/' }))
          } catch (err) {
            this.showError(err)
          } finally {
            this.isLoading = false
          }
        })
    },
    async handleLoginProvider (provider) {
      this.isLoading = true
      try {
        const { error } = await this.$supabase.auth.signIn({
          provider
        })
        if (error) throw new Error(error)
      } catch (err) {
        this.showError(err)
      } finally {
        this.isLoading = false
      }
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
