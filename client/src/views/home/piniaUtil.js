import { ref } from "vue"

export function watchCounterStore(counterStore) {
  function watchState(counterStore) {
    // 监听state
    return counterStore.$subscribe((mutation, state) => {
      console.log(mutation)
      console.log(state)
    })
  }

  let unSubscribeState = ref(function () {})
  const subscribeState = () => {
    unSubscribeState.value = watchState(counterStore)
  }

  return { unSubscribeState, subscribeState }
}

export function watchCounterAction(counterStore) {
  const unSubscribeAction = watchAction(counterStore)

  return { unSubscribeAction }

  function watchAction(counterStore) {
    const unsubscribe = counterStore.$onAction(
      ({
        name, // action 函数的名称
        store, // store 实例，这里是 mainStore
        args, // action 函数参数数组
        after, // 钩子函数，在action函数执行完成返回或者resolves后执行
        onError, // 钩子函数，在action函数报错或者rejects后执行
      }) => {
        console.log("action的函数名", name)
        console.log("参数数组", args)
        console.log("store实例", store)

        after(result => {
          console.log("$onAction after函数", result)
        })

        onError(error => {
          console.log("错误捕获", error)
        })
      }
    )

    return unsubscribe
  }
}
export function watchAction(counterStore) {
  const unsubscribe = counterStore.$onAction(
    ({
      name, // action 函数的名称
      store, // store 实例，这里是 mainStore
      args, // action 函数参数数组
      after, // 钩子函数，在action函数执行完成返回或者resolves后执行
      onError, // 钩子函数，在action函数报错或者rejects后执行
    }) => {
      console.log("action的函数名", name)
      console.log("参数数组", args)
      console.log("store实例", store)

      after(result => {
        console.log("$onAction after函数", result)
      })

      onError(error => {
        console.log("错误捕获", error)
      })
    }
  )

  return unsubscribe
}
