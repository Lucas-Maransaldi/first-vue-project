<template>
  <FormularioPrincipal @tarefa-finalizada="salvarTarefa" />
  <div class="lista">
    <Box v-if="isTarefasEmpty()"> Você não esta muito produtivo hoje :/ </Box>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @tarefa-clicada="_selecionaTarefa"
    />
    <Modal :mostrar="tarefaSelecionada !== null">
      <template v-slot:header>
        <p class="modal-card-title">Editando Tarefa</p>
        <button
          @click="_fecharModal"
          class="delete"
          aria-label="close"
        ></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="descricaoTarefa" class="label"> Descrição </label>
          <input
            type="text"
            class="input"
            v-if="tarefaSelecionada"
            v-model="tarefaSelecionada.descricao"
            id="descricaoTarefa"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button class="button is-success" @click="_alterarTarefa">
          Salvar alterações
        </button>
        <button class="button" @click="_fecharModal">Cancelar</button>
      </template>
    </Modal>
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
  import { computed, defineComponent, ref, watchEffect } from 'vue';
  import Box from '../components/Box.vue';
  import FormularioPrincipal from '../components/FormularioPrincipal.vue';
  import Modal from '../components/Modal.vue';
  import Tarefa from '../components/Tarefa.vue';

  export default defineComponent({
    name: 'Tarefas',
    components: {
      FormularioPrincipal,
      Tarefa,
      Box,
      Modal,
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
      const filtro = ref('');
      const tarefas = computed(() => store.state.tarefa.tarefas);

      watchEffect(() => {
        store.dispatch(GET_TAREFAS, filtro.value);
      });
      return {
        tarefas,
        store,
        filtro,
      };
    },
  });
</script>
