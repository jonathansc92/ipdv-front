
<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Cadastrar" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                </template>
            </Toolbar>
            <DataTable ref="dt" :value="departments.getDepartments" dataKey="id" :loading="loading" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords}">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">
                            Gerenciar Departamentos
                        </h4>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Pesquisar..." />
                        </span>
                    </div>
                </template>
                <Column field="id" header="ID" sortable style="min-width:12rem"></Column>
                <Column field="description" header="Descrição" sortable style="min-width:12rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="edit(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDelete(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <Dialog v-model:visible="objDialog" :style="{ width: '450px' }" header="Departamento" :modal="true" class="p-fluid">
            <div class="field">
                <label for="name">Descrição</label>
                <InputText id="name" v-model.trim="department.description" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !department.description }" />
                <small class="p-error" v-if="submitted && !department.description">{{ messages.REQUIRED }}</small>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" :disabled="disabledBtn" />
                <Button label="Salvar" icon="pi pi-check" :loading="loadingBtn" text @click="save" />
            </template>
        </Dialog>
        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="department">{{ messages.DELETE }}</span>
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
import { departmentStore } from "@/stores/Department";
import messages from '../../constants/messages';

const dt = ref();
const objDialog = ref(false);
const deleteDialog = ref(false);
const department = ref({});
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const departments = departmentStore();
const loading = ref(false);
const loadingBtn = ref(false);
const disabledBtn = ref(false);
const loadingBtnDelete = ref(false);
const disabledDelete = ref(false);

onMounted(async () => {
    loading.value = true;
    await departments.get();
    loading.value = false;
    console.log(departments.getDepartments)
});

const openNew = () => {
    department.value = {};
    submitted.value = false;
    objDialog.value = true;
};

const hideDialog = () => {
    objDialog.value = false;
    submitted.value = false;
};

const save = async () => {
    submitted.value = true;
    loadingBtn.value = true;
    disabledBtn.value = true;

    if (department.value.id) {
        await departments.update(department.value.id, department.value);
    } else {
        await departments.create(department.value);
    }

    objDialog.value = false;
    loadingBtn.value = false;
    disabledBtn.value = false;
};

const edit = (cost) => {
    department.value = { ...cost };
    objDialog.value = true;
};

const confirmDelete = (cost) => {
    department.value = cost;
    deleteDialog.value = true;
};

const deleteObj = async () => {
    disabledDelete.value = true;
    loadingBtnDelete.value = true;

    await departments.delete(department.value.id);

    disabledDelete.value = false;
    loadingBtnDelete.value = true;
    deleteDialog.value = false;
};
</script>
