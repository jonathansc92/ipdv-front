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
                TokenService.setToken(response.data.token);
                MeService.setUser(response.data.user);

                toastr.success(response.data.message);

                this.router.push('/');
            }).catch(async (error) => {
                if (error.response.status === 400) {
                    toastr.error(error.response.data.message);
                }
                else {
                    toastr.error("Erro interno, contate o administrador!");
                }
                this.router.push('/login');
            });
        },
        async logout() {
            await AuthService.logout().then(async response => {
                TokenService.removeToken();
                MeService.removeUser();

                toastr.success(response.data.message);

                this.router.push('/login');
            }).catch(async () => {
                TokenService.removeToken();
                MeService.removeUser();
                this.router.push('/login');
            });
        },
    },
})
