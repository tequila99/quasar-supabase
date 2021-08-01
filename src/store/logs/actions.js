export function showError ({ commit }, payload) {
  commit('setError', payload)
}

export function showInfo ({ commit }, payload) {
  commit('setInfo', payload)
}
