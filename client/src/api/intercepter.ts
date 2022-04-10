// Simple JWT
import axios from 'axios';

axios.interceptors.request.use(
    config => {
        //在所有请求头部添加token值
        const currentUser = JSON.parse(localStorage.getItem('currentUser') as any);
        if (currentUser) {
            const {access} = currentUser;
            (config.headers as any).Authorization = `Bearer ${access}`;
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
            }
        }
        return Promise.reject(error.response.data);
    }
);
