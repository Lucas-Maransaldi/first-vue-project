<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulario para criação de nova tarefa"
      >
        <input
          class="input"
          type="text"
          v-model="descricao"
          placeholder="Qual tarefa você deseja iniciar?"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              v-for="projeto in projetos"
              :value="projeto.id"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import ITarefa from '@/interfaces/ITarefa';
  import { useStore } from '@/store';
  import { computed, defineComponent, ref } from 'vue';
  import Temporizador from './Temporizador.vue';

  export default defineComponent({
    name: 'FormularioPrincipal',
    components: {
      Temporizador,
    },
    methods: {},
    emits: ['tarefaFinalizada'],
    setup(props, { emit }) {
      const store = useStore();

      const descricao = ref('');
      const idProjeto = ref(0);
      const projetos = computed(() => store.state.projeto.projetos);

      const finalizarTarefa = (tempoDecorido: number): void => {
        emit('tarefaFinalizada', {
          descricao: descricao.value,
          tempoEmSegundos: tempoDecorido,
          projeto: projetos.value.find(
            (projeto) => projeto.id === idProjeto.value
          ),
        } as ITarefa);
        descricao.value = '';
      };

      return {
        descricao,
        idProjeto,
        projetos,
        finalizarTarefa,
      };
    },
  });
</script>
<style>
  .formulario {
    background: var(--bg-primario);
    color: var(--texto-primario);
  }
</style>
