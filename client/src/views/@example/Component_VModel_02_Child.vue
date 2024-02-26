<!--https://vuejs.org/guide/components/v-model.html#component-v-model -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div @click="update">parent bound v-model is: {{ model }}</div>
</template>
