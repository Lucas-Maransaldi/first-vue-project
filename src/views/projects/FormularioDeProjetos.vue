<template>
  <section>
    <form>
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit" @click="salvar">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
  import useNotificador from '@/hooks/notificador';
  import { TipoDeNotificacao } from '@/interfaces/INotificacao';
  import IProjeto from '@/interfaces/IProjeto';
  import { useStore } from '@/store';
  import { ADD_PROJECT, CHANGE_PROJECT } from '@/store/actions';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FormularioDeProjetos',
    props: {
      id: {
        type: String,
      },
    },
    mounted() {
      if (this.id) {
        const projetoSelecionado = this.store.state.projetos.find(
          (projeto) => projeto.id === Number(this.id)
        );
        this.nomeDoProjeto = projetoSelecionado?.nome || '';
      }
    },
    data() {
      return {
        nomeDoProjeto: '',
      };
    },
    methods: {
      salvar(): void {
        if (this.id) {
          this.store
            .dispatch(CHANGE_PROJECT, {
              id: this.id,
              nome: this.nomeDoProjeto,
            })
            .then((project) => this._handlerSuccess(project))
            .catch(() => this._handlerFail());
        } else {
          this.store
            .dispatch(ADD_PROJECT, this.nomeDoProjeto)
            .then((project) => this._handlerSuccess(project))
            .catch(() => this._handlerFail());
        }
      },
      _handlerSuccess(project: IProjeto): void {
        this.notificar(
          'Sucesso',
          `Projeto ${project.nome} adicionado com sucesso`,
          TipoDeNotificacao.SUCESSO
        );
        this.$router.push('/projetos');
        this.nomeDoProjeto = '';
      },
      _handlerFail(): void {
        this.notificar(
          'Erro',
          'Falha em adição de projetos',
          TipoDeNotificacao.FALHA
        );
      },
    },
    setup() {
      const store = useStore();
      const { notificar } = useNotificador();
      return {
        notificar,
        store,
      };
    },
  });
</script>
