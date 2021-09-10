/*
export function someGetter (state) {
}
*/
export function getProfile (state) {
  return state.profile
}

export function getAvatarUrl (state) {
  return state.profile ? state.profile.avatar_url || '' : ''
}

export function getFullName (state) {
  return state.profile ? state.profile.full_name || '' : ''
}

export function getEmail (state) {
  return state.profile ? state.profile.email || '' : ''
}
