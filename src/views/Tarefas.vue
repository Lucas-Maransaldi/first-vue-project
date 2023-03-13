<template>
  <FormularioPrincipal @tarefa-finalizada="salvarTarefa" />
  <div class="lista">
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @tarefa-clicada="_selecionaTarefa"
    />
    <Box v-if="isTarefasEmpty()"> Você não esta muito produtivo hoje :/ </Box>
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando Tarefa</p>
          <button
            @click="_fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoTarefa" class="label"> Descrição </label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="_alterarTarefa">
            Salvar alterações
          </button>
          <button class="button" @click="_fecharModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import ITarefa from '@/interfaces/ITarefa';
  import { useStore } from '@/store';
  import {
    ADD_TAREFA,
    CHANGE_TAREFA,
    GET_PROJECT,
    GET_TAREFAS,
  } from '@/store/actions';
  import { computed, defineComponent } from 'vue';
  import Box from '../components/Box.vue';
  import FormularioPrincipal from '../components/FormularioPrincipal.vue';
  import Tarefa from '../components/Tarefa.vue';

  export default defineComponent({
    name: 'Tarefas',
    components: {
      FormularioPrincipal,
      Tarefa,
      Box,
    },
    data() {
      return {
        tarefaSelecionada: null as ITarefa | null,
      };
    },
    methods: {
      salvarTarefa(tarefa: ITarefa): void {
        this.store.dispatch(ADD_TAREFA, tarefa);
      },
      _alterarTarefa(): void {
        this.store
          .dispatch(CHANGE_TAREFA, this.tarefaSelecionada)
          .then(() => this._fecharModal());
      },
      isTarefasEmpty(): boolean {
        return this.tarefas.length === 0;
      },
      _selecionaTarefa(tarefa: ITarefa): void {
        this.tarefaSelecionada = tarefa;
      },
      _fecharModal(): void {
        this.tarefaSelecionada = null;
      },
    },
    setup() {
      const store = useStore();
      store.dispatch(GET_TAREFAS);
      store.dispatch(GET_PROJECT);
      return {
        tarefas: computed(() => store.state.tarefa.tarefas),
        store,
      };
    },
  });
</script>
