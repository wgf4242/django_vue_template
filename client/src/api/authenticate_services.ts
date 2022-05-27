import axios from 'axios'

class AuthenticationService {
    url = '/api/token/'
    access = ''

    constructor() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') as any);
        this.access = currentUser && currentUser.access;
    }

    login(username:string, password:string) {
        return axios.post(this.url, {username, password}).then(res => {
            console.log('login res is ', res)
            const {data} = res;
            const {access} = data;
            if (access) {
                this.access = access
                localStorage.setItem('currentUser', JSON.stringify(res.data));
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
}
export const authenticationService = new AuthenticationService();
