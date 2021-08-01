import { boot } from 'quasar/wrappers'
import { createClient } from '@supabase/supabase-js'
export const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, store, router, redirect }) => {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
    store.dispatch('auth/setSession', session)
    if (event === 'SIGNED_IN') {
      router.push({ path: '/' })
    }
    if (event === 'SIGNED_OUT') {
      router.push({ path: '/auth/login' })
    }
  })
  router.beforeEach(async (to, from, next) => {
    const authRequired = to.matched.some(route => route.meta.authRequired)
    if (authRequired && !supabaseClient.auth.user()) return next({ path: '/auth/login' })
    return next()
  })
  app.config.globalProperties.$supabase = supabaseClient
  if (!supabaseClient.auth.user()) {
    router.push({ path: '/auth/login' })
  }
  return supabaseClient
})
