<template>
  <div>Home view</div>
  <!--  counter没用computed不会自动更新的-->
  <div>counter: {{ counter }}</div>
  <div>user: {{ user }}</div>
  <div>userList: {{ userList }}</div>
  <div>teacherName: {{ teacherName }}</div>
  <div>userDesc: {{ userDesc }}</div>

  <div>
    <div>
      <button @click="change">Change</button>
    </div>
    <div>
      <button @click="subscribeState">subscribeState</button>
      <button @click="unSubscribeState">unSubscribeState</button>
    </div>
    <div>
      <button @click="onActionTest">onActionTest</button>
      <button @click="unSubscribeAction">unSubscribeAction</button>
    </div>
  </div>
</template>

<script lang="ts">
// import {useCounterStore} from '@/stores/counter'
import {storeToRefs} from "pinia";
import {computed, defineComponent, Ref, ref} from "vue";
import {watchAction, watchCounterAction, watchCounterStore} from "@/views/home/piniaUtil.js";
import {useCounterStore} from "@/stores/counter";

export default  defineComponent({
  name: "Home",
  setup(props) {
    const todos:Ref<any[]> = ref([{title:"学习Vue",done:false}])

    const counterStore = useCounterStore()

    counterStore.count++
    counterStore.$patch({count: counterStore.count + 1})
    counterStore.increment()

    // access state
    const {user} = storeToRefs(counterStore)
    const teacherName = computed(() => counterStore.teacherName)
    const userList = computed(() => counterStore.userList)
    // access getter
    const userDesc = computed(() => counterStore.userDesc)

    const change = () => {
      counterStore.$patch((state) => {
        state.teacherName = "德普"
        state.userList[0].age = state.userList[0].age + 1
      });
    }
    const onActionTest = () => {
      counterStore.increment()
    }

    let {unSubscribeState, subscribeState} = watchCounterStore(counterStore);
    const {unSubscribeAction} = watchCounterAction(counterStore);

    return {
      counter: counterStore.count, user, teacherName, userList,
      userDesc,
      change,
      subscribeState, unSubscribeState,
      onActionTest, unSubscribeAction
    }
  }
})
</script>

<style scoped>

</style>
