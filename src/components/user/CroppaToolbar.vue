<template lang='pug'>
div
  q-btn(
    flat
    :text-color='color'
    size='md'
    round
    icon='o_done'
    @click='$emit("upload")'
  )
    q-tooltip Установить
  q-btn.q-ml-xs(
    flat
    :text-color='color'
    size='md'
    round
    icon='o_rotate_right'
    @click='$emit("rotate")'
  )
    q-tooltip Повернуть
  q-btn.q-ml-xs(
    flat
    :text-color='color'
    size='md'
    round
    icon='o_delete'
    @click='$emit("clear")'
  )
      q-tooltip Очистить
</template>

<script>
export default {
  name: 'CroppaToolbar',
  props: {
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>
