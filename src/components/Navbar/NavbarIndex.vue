
<template>
    <div class="card relative z-2">
        <Menubar :model="items">
            <template #end>
                <Button @click="logout" icon="pi pi-fw pi-power-off" label="Sair" link />
            </template>
        </Menubar>
    </div>
</template>

<script>
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import { authStore } from '@/stores/Auth';

export default {
    components: {
        Menubar,
        Button
    },

    data() {
        return {
            authStore: authStore(),
            items: [
                {
                    label: 'Centro de Custos',
                    icon: 'pi pi-sort-alt',
                    url: '/centro-de-custos'
                },
                {
                    label: 'Departamentos',
                    icon: 'pi pi-building',
                    url: '/departamentos'
                },
                {
                    label: 'Usuários',
                    icon: 'pi pi-user',
                    url: '/usuarios'
                },
            ],
        };
    },
    methods: {
        async logout() {
            await this.authStore.logout();
        }
    }
};
</script>