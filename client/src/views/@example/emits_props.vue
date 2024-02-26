<!--
向下翻还有Typescript版本
https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
 -->
<template>

</template>
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
emit('change');
</script>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, {emit}) {
    emit('change') // <-- type check / auto-completion
  }
})
</script>
