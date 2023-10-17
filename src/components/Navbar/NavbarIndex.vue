
<template>
    <div class="card relative z-2">
        <Menubar :model="items">
            <template #start>
                <div class="soha-logo secondary font-medium text-xl uppercase mr-2">
                    SOHA
                </div>
            </template>
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
            items: [],
        };
    }
};
</script>