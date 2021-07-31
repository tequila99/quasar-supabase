<template lang='pug'>
q-page(padding)
  h5.text-center.text-primary.q-mt-lg {{ getAuthTitle }}
  q-form.authentication.q-px-md.q-gutter-y-sm(ref="emailAuthenticationForm" @submit="onSubmit")
    q-input(
      v-model="email"
      outlined
      color="primary"
      lazy-rules="lazy-rules"
      name="email"
      label="Email"
      type='email'
      :rules='[val => !!val || "Введите адрес электронной почты"]'
      )
        template(v-slot:prepend)
          q-icon(name='far fa-envelope')
        q-tooltip Введите адрес электронной почты в качестве логина для входа в программу
    q-input(
      v-model="password"
      for="password"
      name="password"
      lazy-rules="lazy-rules"
      outlined
      autocomplete="current-password"
      color="primary"
      data-cy="password"
      label="Password"
      :rules='[val => !!val || "Введите пароль"]'
      :type="isPwd ? 'password' : 'text'"
      @keyup.enter="onSubmit()"
    )
      template(v-slot:prepend)
          q-icon(name='fas fa-lock')
      template(v-slot:append)
        q-icon.cursor-pointer(
          :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd"
        )
      q-tooltip {{ isRegistration ? 'Укажите пароль для регистрации в программе' : 'Введите пароль для входа в программу'}}
    q-input(
      v-if="isRegistration"
      lazy-rules="lazy-rules"
      outlined
      autocomplete="new-password"
      color="primary"
      data-cy="verifyPassword"
      label="Verify password"
      v-model="passwordMatch"
      :rules='[ val => !!val || "Введите пароль повторно", val => val === password || "Пароли не совпадают" ]'
      :type="isPwd ? 'password' : 'text'"
      @keyup.enter="onSubmit();"
    )
      template(v-slot:prepend)
          q-icon(name='fas fa-lock')
      template(v-slot:append)
        q-icon.cursor-pointer(
          :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd"
        )
      q-tooltip Повторите ввод пароля для регистрации в программе
    q-btn.full-width.q-mt-sm(
      color="primary"
      data-cy="submit"
      padding="md xs"
      type="submit"
      :icon='isRegistration ? "fas fa-user-plus" : "fas fa-sign-in-alt"'
      :label="getAuthButtonLabel")
    q-btn.full-width.q-mt-sm(
      color="secondary"
      padding="md xs"
      label="Войти с помощью Google"
      icon='fab fa-google'
      @click='handleLoginGoogle'
    )
    .q-ml-lg.q-mt-lg.text-weight-medium
      p
        router-link.text-blue(:to="routeAuthentication")
          span(v-if="isRegistration") У меня есть учетная запись
          span(v-else) Создать новый аккаунт
      //- p
        router-link.text-blue(to="forgotPassword") Я не помню пароль
</template>

<script>
import { mapActions } from 'vuex'
// import { loadingSpinner } from '../mixins'
export default {
  // mixins: [loadingSpinner],
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
      createUser: 'auth/createUser'
    //   login: 'auth/login',
    //   loginGoogle: 'auth/loginGoogle',
    //   showError: 'logs/showError'
    }),
    onSubmit () {
      const { email, password } = this
      // console.log(email, password)
      this.$refs.emailAuthenticationForm.validate()
        .then(async success => {
          if (success) {
            this.isLoading = true
            try {
              if (this.isRegistration) {
                await this.createUser({ email, password })
              } else {
                // await this.login({ email, password })
              }
            } catch (err) {
              // this.showError(err)
            } finally {
              this.isLoading = false
            }
          }
        })
    },
    async handleLoginGoogle () {
      // try {
      //   await this.loginGoogle()
      // } catch (err) {
      //   this.showError(err)
      // }
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
