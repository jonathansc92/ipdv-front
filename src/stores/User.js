import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import UserService from '../services/UserService';
import messages from '../constants/messages';

const toastr = useToast();

export const userStore = defineStore('userStore', {
    id: 'userStore',
    state: () => ({
        users: [],
        user: {},
    }),
    getters: {
        getUsers() {
            return this.users;
        },
        getUser() {
            return this.user;
        },
    },
    actions: {
        async get() {
            await UserService.get().then(async response => {
                this.users = response.data.data;

                toastr.success(response.data.message);
            }).catch(async (error) => {
                if (error) {
                    toastr.error(error.response.data.message);
                }
                else {
                    toastr.error(messages.ERROR);
                }
            });
        },
        async create(data) {
            await UserService.create(data).then(async response => {
                this.users.push(data.data);
                toastr.success(response.data.message);
            }).catch(async (error) => {
                if (error) {
                    toastr.error(error.response.data.message);
                }
                else {
                    toastr.error(messages.ERROR);
                }
            });
        },
        async update(id, data) {
            await UserService.update(id, data).then(async response => {
                this.user = response.data.data;

                const itemIndex = this.users.findIndex(user => user.id === id);
                this.users[itemIndex] = this.user;

                toastr.success(response.data.message);
            }).catch(async (error) => {
                if (error) {
                    toastr.error(error.response.data.message);
                }
                else {
                    toastr.error(messages.ERROR);
                }
            });
        },
        async delete(id) {
            await UserService.delete(id).then(async response => {
                this.user = response.data.data;

                const itemIndex = this.users.findIndex(user => user.id === id);
                this.users.splice(itemIndex, 1);

                toastr.success(response.data.message);
            }).catch(async (error) => {
                if (error) {
                    toastr.error(error.response.data.message);
                }
                else {
                    toastr.error(messages.ERROR);
                }
            });
        },
    },
})
