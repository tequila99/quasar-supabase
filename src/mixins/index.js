export const loadingSpinner = {
  computed: {
    isLoading: {
      set (value) {
        this.$store.dispatch('loading/setLoading', value)
      },
      get () {
        return this.$store.getters.isLoading
      }
    }
  }
}
