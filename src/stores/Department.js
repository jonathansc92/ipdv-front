import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import DepartmentService from '../services/DepartmentService';

const toastr = useToast();

export const departmentStore = defineStore('departmentStore', {
    id: 'departmentStore',
    state: () => ({
        departments: [],
    }),
    getters: {
        getDepartments() {
            return this.departments;
        },
    },
    actions: {
        async get() {
            await DepartmentService.get().then(async response => {
                console.log(response)
                this.departments = response.data.data;

                toastr.success(response.data.message);
            }).catch(async (error) => {
                console.log(error)
                // if (error) {
                //     toastr.error(error.response.data.message);
                // }
                // else {
                //     toastr.error("Erro interno, contate o administrador!");
                // }
            });
        },
    },
})
