import { Loading } from 'quasar'

export function setLoading ({ commit }, payload) {
  commit('setLoading', payload)
  if (payload) {
    Loading.show()
  } else {
    Loading.hide()
  }
}
