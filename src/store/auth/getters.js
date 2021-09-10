/*
export function someGetter (state) {
}
*/
export function currentUser (state) {
  return state.session ? state.session.user : null
}
export function accessToken (state) {
  return state.session ? state.session.access_token : null
}
