<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
  import { useStore } from '@/store';
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'Projetos',
    setup() {
      const store = useStore();
      return {
        projects: computed(() => store.state.projetos),
      };
    },
  });
</script>

<style scoped>
  .projetos {
    padding: 1.25rem;
  }
</style>
