<template>
  <main>
    <div class="grid">
      <div class="col-12 flex justify-content-center">
        <Button class="m-8" @click="logout">Voltar ao login</Button>
      </div>
    </div>
  </main>
</template>

<script>
import { authStore } from '@/stores/Auth';
import Button from 'primevue/button';

export default {
  components: {
    Button,
  },

  data() {
    return {
      authStore: authStore(),
    }
  },
  methods: {
    async logout() {
      await this.authStore.logout();
    }
  }
}
</script>
