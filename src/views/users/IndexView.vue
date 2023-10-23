
<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Cadastrar" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                </template>
            </Toolbar>
            <DataTable ref="dt" :value="users.getUsers" dataKey="id" :loading="loading" :paginator="true" :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords}">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">
                            Gerenciar Usuários
                        </h4>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Pesquisar..." />
                        </span>
                    </div>
                </template>
                <Column field="id" header="#" sortable style="min-width:12rem"></Column>
                <Column field="name" header="Nome" sortable style="min-width:12rem"></Column>
                <Column field="email" header="Email" sortable style="min-width:12rem"></Column>
                <Column field="department" header="Departamento" sortable style="min-width:12rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="edit(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDelete(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <Dialog v-model:visible="objDialog" :style="{ width: '450px' }" header="Usuário" :modal="true" class="p-fluid">
            <div class="field">
                <label for="name">Nome</label>
                <InputText id="name" v-model.trim="user.name" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !user.name }" />
                <small class="p-error" v-if="submitted && !user.name">{{ messages.REQUIRED }}</small>
            </div>
            <div class="field">
                <label for="email">Email</label>
                <InputText id="email" v-model.trim="user.email" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !user.email && !isValidEmail }" type="email" />
                <small class="p-error" v-if="submitted && !user.email">{{ messages.REQUIRED }}</small>
                <small class="p-error" v-if="submitted && !isValidEmail">{{ messages.IS_VALID_EMAIL }}</small>
            </div>
            <div class="field">
                <label for="name">Senha</label>
                <Password id="password" v-model="user.password" autofocus :feedback="false" toggleMask
                    :class="{ 'p-invalid': submitted && !user.password && !user.id }" />
                <small class="p-error" v-if="submitted && !user.password && !user.id">{{ messages.REQUIRED }}</small>
            </div>
            <div class="field">
                <label for="department" class="mb-3">Departamento</label>
                <Dropdown id="department" v-model="user.department_id" :options="departments.getDepartments"
                    optionLabel="description" optionValue="id" placeholder="Selecione um departamento">
                </Dropdown>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" :disabled="disabledBtn" />
                <Button label="Salvar" icon="pi pi-check" :loading="loadingBtn" text @click="save" />
            </template>
        </Dialog>
        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="user">{{ messages.DELETE }}</span>
            </div>
            <template #footer>
                <Button label="Não" icon="pi pi-times" text @click="deleteDialog = false" :disabled="disabledDelete" />
                <Button label="Sim" icon="pi pi-check" text @click="deleteObj" :loading="loadingBtnDelete" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { FilterMatchMode } from 'primevue/api';

import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Password from 'primevue/password';

import { userStore } from "@/stores/user";
import { departmentStore } from "@/stores/Department";

import messages from '../../constants/messages';
import { useValidate } from '../../composables/useValidate';

const dt = ref();
const objDialog = ref(false);
const deleteDialog = ref(false);
const user = ref({});
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

const users = userStore();
const departments = departmentStore();

const loading = ref(false);
const loadingBtn = ref(false);
const disabledBtn = ref(false);
const loadingBtnDelete = ref(false);
const disabledDelete = ref(false);

const isValidEmail = ref(false);

onMounted(async () => {
    loading.value = true;

    await departments.get();
    await users.get();

    loading.value = false;
});

const openNew = () => {
    user.value = {};
    submitted.value = false;
    objDialog.value = true;
};

const hideDialog = () => {
    objDialog.value = false;
    submitted.value = false;
};

const save = async () => {
    submitted.value = true;
    isValidEmail.value = useValidate().validateEmail(user.value.email);

    if (user.value.name && user.value.email && isValidEmail.value) {
        loadingBtn.value = true;
        disabledBtn.value = true;

        const form = {
            name: user.value.name,
            password: user.value.password,
            department_id: user.value.department_id ? user.value.department_id : null,
            email: user.value.email
        }

        if (user.value.id) {
            await users.update(user.value.id, form);
        } else {
            if (user.value.password) {
                await users.create(form);
            }
        }

        objDialog.value = false;
        loadingBtn.value = false;
        disabledBtn.value = false;
    }
};

const edit = (cost) => {
    user.value = { ...cost };
    objDialog.value = true;
};

const confirmDelete = (cost) => {
    user.value = cost;
    deleteDialog.value = true;
};

const deleteObj = async () => {
    disabledDelete.value = true;
    loadingBtnDelete.value = true;

    await users.delete(user.value.id);

    disabledDelete.value = false;
    loadingBtnDelete.value = false;
    deleteDialog.value = false;
};
</script>
