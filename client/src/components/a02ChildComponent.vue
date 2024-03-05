<!--https://vuejs.org/api/sfc-script-setup.html#defineslots-->
<!--https://blog.vuejs.org/posts/vue-3-3#typed-slots-with-defineslots-->

<template>
  <div>
    <div v-for="item in props.data" :key="item.id">
      <slot :name="item.slotName" :row="item" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends {id: number;slotName:string}">
const props = defineProps<{
  data: T[];
}>();

// defineSlots<{ default(props: { test: string }): any; }>();
// defineSlots<{ bodyCell(props: { row: T; columnKey: string }): any; }>();
</script>

<style scoped></style>
