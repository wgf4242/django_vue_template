<template>
    用户名
    <input type="text" v-model="username">
    密码
    <input type="text" v-model="password">
    <button @click="onSubmit">提交</button>
<!--  <van-form @submit="onSubmit">-->
<!--    <van-cell-group inset>-->
<!--      <van-field-->
<!--          v-model="username"-->
<!--          name="用户名"-->
<!--          label="用户名"-->
<!--          placeholder="用户名"-->
<!--          :rules="[{ required: true, message: '请填写用户名' }]"-->
<!--      />-->
<!--      <van-field-->
<!--          v-model="password"-->
<!--          type="password"-->
<!--          name="密码"-->
<!--          label="密码"-->
<!--          placeholder="密码"-->
<!--          :rules="[{ required: true, message: '请填写密码' }]"-->
<!--      />-->
<!--    </van-cell-group>-->
<!--    <div style="margin: 16px;">-->
<!--      <van-button round block type="primary" native-type="submit">-->
<!--        提交-->
<!--      </van-button>-->
<!--    </div>-->
<!--  </van-form>-->

</template>

<script lang="ts">
import { ref } from 'vue';
import {authenticationService} from "@/api/authenticate_services";
import {useRoute, useRouter} from "vue-router";
export default {
  setup() {
    const username = ref('');
    const password = ref('');
    let router = useRouter();
    let route = useRoute();
    const onSubmit = (values:any) => {
      console.log('submit', values);

      authenticationService.login(username.value, password.value).then(e => {
        console.log(route);
        const path = route.query.redirect || '/';
        router.push({path} as any);
        console.log('res', e)
      })
    };

    return {
      username,
      password,
      onSubmit,
    };
  },
};
</script>

<style scoped>

</style>
