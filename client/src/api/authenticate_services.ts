import axios from 'axios'
import {useProjectStore} from "@/stores/project";

let store = useProjectStore();
class AuthenticationService {
    url = '/api/token/'
    url_current_user = '/api/current_user/'
    access = ''

    constructor() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') as any);
        this.access = currentUser && currentUser.access;
        store.user = currentUser;
    }

    login(username:string, password:string) {
        return axios.post(this.url, {username, password}).then(res => {
            console.log('login res is ', res)
            const {data} = res;
            const {access} = data;
            if (access) {
                this.access = access
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                this.getCurrentUser();
                return res
            } else {
                return res
            }
        }).catch(err => {
            console.log('auth login error', err)
            return Promise.reject(err);
        });
    }

    logout(): any {
        this.access = '';
        localStorage.removeItem('currentUser');
    }
    update_password(old_password: string, new_password: string) {
        const update_url = '/update_password/'
        return axios.put(update_url, {old_password, new_password})
    }
    getCurrentUser() {
        axios.get(this.url_current_user).then(res => {
            let userInfo = res.data;
            let item = JSON.parse(localStorage.getItem('currentUser') as any);
            const r = {...item, ...res.data};
            localStorage.setItem('currentUser', JSON.stringify(r));
            store.user = userInfo;
        });
    }
}
export const authenticationService = new AuthenticationService();
