// import { supabaseClient } from '../../boot/supabase'
// import router from '../../router'

export const setSession = function ({ commit }, session) {
  commit('setSession', session)
}
// export const createUser = async function (_, { email, password }) {
//   console.log(supabaseClient)
//   console.log(email, password)
//   const { user, session, error } = await supabaseClient.auth.signUp({
//     email,
//     password
//   })
//   console.log(user, session, error)
// }

// export const login = async function (_, { email, password }) {
//   await loginWithEmail(email, password)
//   router.push({ path: '/' })
// }

// export const loginGoogle = async function (_) {
//   const { user } = await loginGooglePopup()
//   const id = user.uid
//   firestore().collection('users').doc(id).get()
//     .then(snapshot => {
//       if (!snapshot.exists) {
//         firestore().collection('users').doc(id).set(new User({ id, ...user }))
//         if (user.phoneNumber) {
//           return router.push({ path: '/user/profile' })
//         }
//       }
//       return router.push({ path: '/' })
//     })
// }

// export const logout = async function (_) {
//   await logoutUser()
// }
// export const sendEmail = async function (_, { email }) {
//   return sendResetEmail(email)
// }
