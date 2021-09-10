<template lang='pug'>
.column
  .pr-bg-image
    .pr-avatar.relative
      user-avatar.tw-absolute.tw-left-10.tw-top-6(
        v-model='photoURL'
      )
  .pr-form.q-mt-xl
    q-form.q-px-lg.column.q-gutter-y-none(ref='userform' @submit='handleSubmit' style='width:40rem;')
      q-input.q-mb-md(
        v-model='email'
        type='email'
        outlined
        color='primary'
        label='E-Mail'
        disable
        )
          template(v-slot:prepend)
            q-icon(name='far fa-envelope')
          q-tooltip Адрес электронной почты
      q-input(
        v-model='displayName'
        outlined
        color='primary'
        label='Имя'
        placeholder='Иван Иванов'
        lazy-rules
        :rules='[ val => !!val || "Введите отображаемое имя"]'
        )
          template(v-slot:prepend)
            q-icon(name='far fa-user')
          q-tooltip Отображаемое имя
      q-input(
        v-model='phoneNumber'
        outlined
        color='primary'
        label='Телефон'
        prefix='+7'
        mask='(###) ###-##-##'
        lazy-rules
        :rules='[ val => !!val || "Введите номер мобильного телефона"]'
        )
          template(v-slot:prepend)
            q-icon(name='fas fa-phone')
          q-tooltip Номер мобильного телефона
      q-btn.full-width.q-mt-lg(
        color='primary'
        data-cy='submit'
        padding='md xs'
        type='submit'
        icon='o_done'
        label='Записать'
      )
</template>

<script>
import UserAvatar from './UserAvatar'
const normalizePhone = phone => phone.replace('+7', '')
export default {
  name: 'UserForm',
  props: {
    value: {
      type: Object,
      default: () => ({
        email: '',
        displayName: '',
        phoneNumber: '',
        photoURL: ''
      })
    }
  },
  data () {
    return {
      email: '',
      displayName: '',
      phoneNumber: '',
      photoURL: ''
    }
  },
  watch: {
    value (val) {
      this.$nextTick(() => {
        this.setUser(val)
      })
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.userform.validate(true).then(outcome => {
        if (outcome) {
          this.$emit('input', {
            email: this.email,
            displayName: this.displayName,
            phoneNumber: this.phoneNumber,
            photoURL: this.photoURL
          })
          this.$emit('update')
        }
      })
    },
    setUser (user) {
      this.email = user?.email || ''
      this.displayName = user?.displayName || ''
      this.photoURL = user?.photoURL || ''
      this.phoneNumber = normalizePhone(user?.phoneNumber || '')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setUser(this.value)
    })
  },
  components: {
    UserAvatar
  }
}
</script>

<style lang='scss'>
.pr-bg-image {
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  height: 8rem;
  background-image: url('~assets/material.png');
  background-position: 50% 50%;
  background-size: auto;
}
.pr-avatar {
  max-width: 42rem;
  height: 100%;
  margin: 0 auto;
}
.pr-form {
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
