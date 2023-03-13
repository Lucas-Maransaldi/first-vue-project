<template>
  <Box>
    <div class="columns clicavel" @click="_handlerClick">
      <div class="column is-4">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <CronometerDisplay :tempoEmSegundos="tarefa.tempoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import ITarefa from '../interfaces/ITarefa';
  import Box from './Box.vue';
  import CronometerDisplay from './CronometerDisplay.vue';

  export default defineComponent({
    name: 'Tarefa',
    props: {
      tarefa: {
        type: Object as PropType<ITarefa>,
        required: true,
      },
    },
    emits: ['tarefaClicada'],
    methods: {
      _handlerClick(): void {
        this.$emit('tarefaClicada', this.tarefa);
      },
    },
    components: { CronometerDisplay, Box },
  });
</script>
<style>
  .clicavel {
    cursor: pointer;
  }
</style>
