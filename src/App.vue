<template>
  <main class="columns is-gapless is-multiline " :class="{ 'modo-escuro': isDarkMode}">
    <div class="column is-one-quarter">
      <BarraLateral @toggle-theme="_changeTheme"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
},
  data() {
    return {
      isDarkMode: false
    }
  },
  methods: {
    _changeTheme(isDarkMode: boolean): void {
      this.isDarkMode = isDarkMode;
    }
  }
});
</script>

<style>
  .lista {
    padding: 1.25rem;
  }
  main {
    --bg-primario: #fff;
    --texto-primario: #000;
  }
  main.modo-escuro {
    --bg-primario: #2b2b2b;
    --texto-primario: #ddd;
  }
  .conteudo {
    background: var(--bg-primario);
  }
</style>
