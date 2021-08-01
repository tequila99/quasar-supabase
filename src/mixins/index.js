export const loadingSpinner = {
  computed: {
    isLoading: {
      set (value) {
        console.log('Хрень')
        this.$store.commit('loading/setLoading', value)
      },
      get () {
        return this.$store.getters.isLoading
      }
    }
  }
}
