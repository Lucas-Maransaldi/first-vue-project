<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': isDarkMode }"
  >
    <div class="column is-one-quarter">
      <BarraLateral @toggle-theme="_changeTheme" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BarraLateral from './components/BarraLateral.vue';
  import Notificacoes from './components/Notificacoes.vue';

  export default defineComponent({
    name: 'App',
    components: {
      BarraLateral,
      Notificacoes,
    },
    data() {
      return {
        isDarkMode: false,
      };
    },
    methods: {
      _changeTheme(isDarkMode: boolean): void {
        this.isDarkMode = isDarkMode;
      },
    },
  });
</script>

<style>
  main {
    --bg-primario: #fff;
    --texto-primario: #000;
  }
  main.modo-escuro {
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
  }
  .lista {
    padding: 1.25rem;
  }
  .conteudo {
    background-color: var(--bg-primario);
  }
</style>
