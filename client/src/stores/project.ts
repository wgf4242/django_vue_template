import {defineStore} from 'pinia'

// type Foo = {
//     project: any,
//     username: string;
// }
export const useProjectStore = defineStore('project', {
    state: () => {
        return {project: {}, team: {}, user:{} };
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        increment() {
        },
    },
    getters: {
        // userDesc: (state) => `${state.user.name}今年${state.user.age}岁了`,
        //
        // userBesidesDesc(): string { // 需注明类型
        //     return `${this.user.age}岁的${this.user.name}` // 可以使用 this 获取值
        // },

    }
})
