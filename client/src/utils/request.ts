// Simple JWT
import axios from 'axios';
axios.interceptors.request.use(
    config => {
        //在所有请求头部添加token值
        // const token = stores.state.token;
        // if (token) {
        //   config.headers.Authorization = token;
        // }
        const currentUser = JSON.parse(localStorage.getItem('currentUser') as any);
        if (currentUser) {
            const {access} = currentUser;
            config.headers!.Authorization = `Bearer ${access}`;
        }
        return config;
    },
    error => {
        console.log("err");
        return Promise.reject(error);
    }
);

// response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log('401 error')
                    localStorage.removeItem('currentUser')
                    // this.$router.replace({})
                // this.$stores.commit("del_token");
                // router.replace({
                //   path: "/login",
                //   query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
                // });
            }
        }
        return Promise.reject(error.response.data);
    }
);
