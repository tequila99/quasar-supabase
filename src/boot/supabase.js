import { boot } from 'quasar/wrappers'
import { createClient } from '@supabase/supabase-js'
export const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, store, router, redirect }) => {
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    console.log(event)
    store.dispatch('auth/setSession', session)
    if (event === 'SIGNED_IN') {
      const { user } = session
      const { id, email, phone, user_metadata: userMetaData, app_metadata: { provider }, updated_at: updatedAt } = user
      const { avatar_url: avatarUrl, full_name: fullName } = provider === 'google' ? userMetaData : { avatar_url: '', full_name: '' }
      let resultQuery = await supabaseClient.from('profiles').select().eq('id', id)
      if (!resultQuery.error && !resultQuery.data.length) {
        resultQuery = await supabaseClient.from('profiles').insert([
          { id, email, phone, avatar_url: avatarUrl, full_name: fullName, updated_at: updatedAt }
        ])
      }
      const { error, data } = resultQuery
      if (!error && data.length) store.dispatch('user/setProfile', data[0])
      redirect({ path: '/' })
      return
    }
    if (event === 'SIGNED_OUT') {
      redirect({ path: '/auth/login' })
      return
    }
    if (event === 'PASSWORD_RECOVERY') {
      redirect({ path: '/auth/change-password' })
      return
    }
    if (event === 'USER_UPDATED') {
      store.dispatch('auth/showInfo', 'Пароль пользователя успешно изменен')
      redirect({ path: '/' })
    }
  })
  router.beforeEach(async (to, from, next) => {
    console.log(from)
    console.log(to)
    const authRequired = to.matched.some(route => route.meta.authRequired)
    if (authRequired && !supabaseClient.auth.user()) return next(false)
    return next()
  })
  app.config.globalProperties.$supabase = supabaseClient
  if (!supabaseClient.auth.user()) {
    // redirect({ path: '/auth/login' })
  }
  const currentSession = supabaseClient.auth.session()
  store.dispatch('auth/setSession', currentSession)
  return supabaseClient
})
