<template>
    <FormularioPrincipal @tarefa-finalizada="salvarTarefa"/>
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="isTarefasEmpty()">
        Você não esta muito produtivo hoje :/
        </Box>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  import Box from '../components/Box.vue';
  import FormularioPrincipal from '../components/FormularioPrincipal.vue';
  import Tarefa from '../components/Tarefa.vue';
  import ITarefa from  '../interfaces/ITarefa'
  
  export default defineComponent({
    name: 'Tarefas',
    components: {
      FormularioPrincipal,
      Tarefa,
      Box
  },
    data() {
      return {
        tarefas: [] as ITarefa[]
      }
    },
    methods: {
      salvarTarefa(tarefa: ITarefa): void {
        this.tarefas.push(tarefa);
      },
      isTarefasEmpty(): boolean {
        return this.tarefas.length === 0;
      },
    }
  });
</script>
  