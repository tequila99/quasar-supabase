<template lang='pug'>
div(
  class='tw-rounded-full'
  class='tw-bg-white tw-w-36 tw-h-36'
)
  div(
    class='tw-relative tw-w-full tw-h-full'
    class='tw-flex tw-justify-center tw-items-center'
  )
    q-avatar.tw-inset-0(
      round color='blue-grey-2' size='8.4rem' text-color='white'
    )
      img(v-if='value' :src='value')
      q-icon(v-else size='6rem' name='o_person')
    q-croppa(
      ref='croppa'
      accept='image/*'
      v-model='croppa'
      :width='136'
      :height='136'
      prevent-white-space
      placeholder=''
      :show-remove-button='false'
      @init='onCroppaInit'
      @new-image-drawn='isCroppa=true'
      @image-remove='isCroppa=false'
      @loading-start='isLoading=true'
      @loading-end='isLoading=false'
    )
    croppa-toolbar.tw-absolute.tw-bg-transparent.tw-top-2.tw--right-32(
      v-if='isCroppa'
      @upload='handleUploadImage'
      @rotate='handleRotateImage'
      @clear='handleClearImage'
    )
</template>

<script>
import CroppaToolbar from './CroppaToolbar'
import { loadingSpinner } from 'src/mixins'
import { uid } from 'quasar'
import { mapActions } from 'vuex'
export default {
  mixins: [loadingSpinner],
  name: 'UserAvatar',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isCroppa: false,
      croppa: {}
    }
  },
  methods: {
    ...mapActions({
      showError: 'logs/showError'
    }),
    onCroppaInit () {
      this.croppa.addClipPlugin((ctx, x, y, w, h) => {
        ctx.beginPath()
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
        ctx.closePath()
      })
    },
    handleUploadImage () {
      this.croppa.generateBlob(blob => {
        const ref = this.$fb
          .storage()
          .ref()
          .child(uid())
        ref
          .put(blob)
          .then(() => ref.getDownloadURL())
          .then(url => {
            this.$emit('input', url)
          })
          .catch(error => {
            this.showError(error)
          })
          .finally(() => {
            this.isCroppa = false
          })
      })
    },
    handleClearImage () {
      this.$refs.croppa.remove()
    },
    handleRotateImage () {
      this.$refs.croppa.rotate()
    }
  },
  created () {},
  mounted () {},
  components: { CroppaToolbar }
}
</script>

<style lang='scss'>
.croppa-container {
  background-color: transparent;
  align-self: center;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}
</style>
