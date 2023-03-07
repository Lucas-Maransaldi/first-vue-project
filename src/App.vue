<template>
  <main class="columns is-gapless is-multiline " :class="{ 'modo-escuro': isDarkMode}">
    <div class="column is-one-quarter">
      <BarraLateral @toggle-theme="_changeTheme"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioPrincipal @tarefa-finalizada="salvarTarefa"/>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="isTarefasEmpty()">
          Você não esta muito produtivo hoje :(
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Box from './components/Box.vue';
import FormularioPrincipal from './components/FormularioPrincipal.vue';
import Tarefa from './components/Tarefa.vue';
import ITarefa from  './interfaces/ITarefa'

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioPrincipal,
    Tarefa,
    Box
},
  data() {
    return {
      tarefas: [] as ITarefa[],
      isDarkMode: false
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa);
    },
    isTarefasEmpty(): boolean {
      return this.tarefas.length === 0;
    },
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
