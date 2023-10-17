<template>
  <NavbarIndex v-if="this.$route.path !== '/login'" />
  <router-view />
</template>

<script>
import NavbarIndex from '@/components/Navbar/NavbarIndex.vue'

export default {
  components: {
    NavbarIndex,
  }
}
</script>