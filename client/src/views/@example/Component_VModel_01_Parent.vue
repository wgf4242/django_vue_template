<!--https://vuejs.org/guide/components/v-model.html#component-v-model -->
<script setup>
import Component_VModel_02_Child from "@/views/@example/Component_VModel_02_Child.vue";
import {ref} from "vue";

const count = ref('')
</script>

<template>
  <Component_VModel_02_Child v-model="count"/>
</template>
