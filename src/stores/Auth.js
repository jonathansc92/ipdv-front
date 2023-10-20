import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import AuthService from '@/services/AuthService.js';
import TokenService from '@/services/TokenService';
import MeService from '../services/MeService';

const toastr = useToast();

export const authStore = defineStore('authStore', {
    id: 'authStore',
    state: () => ({
        me: ref(null),
    }),
    getters: {
        getMe() {
            return this.me;
        },
    },
    actions: {
        async login(data) {
            await AuthService.login(data).then(async response => {
                console.log(response)
                TokenService.setToken(response.data.data.token);

                toastr.success(response.data.message);

                this.router.push('/centro-de-custos');
            }).catch(async (error) => {
                console.log(error)
                if (error.response.data) {
                    toastr.error(error.response.data.message);
                }
                this.router.push('/login');
            });
        },
        async logout() {
                TokenService.removeToken();
                MeService.removeUser();

                this.router.push('/login');
        },
    },
})
