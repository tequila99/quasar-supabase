export function setAuthState (state, { isAuthenticated, isReady, uid }) {
  state.isAuthenticated = isAuthenticated
  state.isReady = isReady
  state.uid = uid
}
