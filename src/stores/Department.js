import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import DepartmentService from '../services/DepartmentService';
import messages from '../constants/messages';

const toastr = useToast();

export const departmentStore = defineStore('departmentStore', {
    id: 'departmentStore',
    state: () => ({
        departments: [],
        department: {},
    }),
    getters: {
        getDepartments() {
            return this.departments;
        },
        getDepartment() {
            return this.department;
        },
    },
    actions: {
        async get() {
            await DepartmentService.get().then(async response => {
                this.departments = response.data.data;

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
            await DepartmentService.create(data).then(async response => {
                this.departments.push(data.data);
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
            await DepartmentService.update(id, data).then(async response => {
                this.department = response.data.data;

                const itemIndex = this.departments.findIndex(department => department.id === id);
                this.departments[itemIndex] = this.department;

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
            await DepartmentService.delete(id).then(async response => {
                this.department = response.data.data;

                const itemIndex = this.departments.findIndex(department => department.id === id);
                this.departments.splice(itemIndex, 1);

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
});
