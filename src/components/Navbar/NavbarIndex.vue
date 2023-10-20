
<template>
    <div class="card relative z-2">
        <Menubar :model="items">
        </Menubar>
    </div>
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
    components: {
        Menubar
    },

    data() {
        return {
            items: [
                {
                    label: 'Centro de Custos',
                    icon: 'pi pi-sort-alt',
                    route: '/centro-de-custos'
                },
                {
                    label: 'Departamentos',
                    icon: 'pi pi-building',
                    route: '/departamentos'
                },
                {
                    label: 'Usuários',
                    icon: 'pi pi-user',
                    route: '/usuarios'
                },
                {
                    label: 'Sair',
                    icon: 'pi pi-fw pi-power-off'
                }
            ],
        };
    }
};
</script>