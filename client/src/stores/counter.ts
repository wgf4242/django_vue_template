import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => {
        const user = {
            name: '小明',
            age: 7,
        }
        const teacherName = 'aa'
        return {count: 0, user, teacherName, userList: [{name: 'n1', age: 1}]}
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        increment() {
            this.count++
        },
    },
    getters: {
        userDesc: (state) => `${state.user.name}今年${state.user.age}岁了`,

        userBesidesDesc(): string { // 需注明类型
            return `${this.user.age}岁的${this.user.name}` // 可以使用 this 获取值
        },

        returnUserInfo() {
            return this.userDesc // 也可以使用 this 获取其他getters
        },
    }
})
