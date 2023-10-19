import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import CostCenterService from '../services/CostCenterService';
import messages from '../constants/messages';

const toastr = useToast();

export const costCenterStore = defineStore('costCenterStore', {
    id: 'costCenterStore',
    state: () => ({
        costCenters: [],
        costCenter: {},
    }),
    getters: {
        getCostCenters() {
            return this.costCenters;
        },
        getCostCenter() {
            return this.costCenter;
        },
    },
    actions: {
        async get() {
            await CostCenterService.get().then(async response => {
                console.log(response)
                this.costCenters = response.data.data;

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
            await CostCenterService.create(data).then(async response => {
                console.log(response)
                this.costCenters.push(data.data);
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
            await CostCenterService.update(id, data).then(async response => {
                this.costCenter = response.data.data;

                const itemIndex = this.costCenters.findIndex(costCenter => costCenter.id === id);
                this.costCenters[itemIndex] = this.costCenter;

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
            await CostCenterService.delete(id).then(async response => {
                this.costCenter = response.data.data;

                const itemIndex = this.costCenters.findIndex(costCenter => costCenter.id === id);
                this.costCenters.splice(itemIndex, 1);

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
