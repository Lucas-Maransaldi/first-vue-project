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
  import { useStore } from '@/store';
  import { ADD_PROJECT, CHANGE_PROJECT } from '@/store/actions';
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'FormularioDeProjetos',
    props: {
      id: {
        type: String,
      },
    },
    methods: {},
    setup(props) {
      const router = useRouter();
      const store = useStore();
      const { notificar } = useNotificador();
      const nomeDoProjeto = ref('');
      if (props.id) {
        const projetoSelecionado = store.state.projeto.projetos.find(
          (projeto) => projeto.id === Number(props.id)
        );
        nomeDoProjeto.value = projetoSelecionado?.nome || '';
      }

      const _handlerSuccess = (): void => {
        notificar(
          'Sucesso',
          `Projeto adicionado com sucesso`,
          TipoDeNotificacao.SUCESSO
        );
        router.push('/projetos');
        nomeDoProjeto.value = '';
      };

      const _handlerFail = (): void => {
        notificar(
          'Erro',
          'Falha em adição de projetos',
          TipoDeNotificacao.FALHA
        );
      };

      const salvar = (): void => {
        if (props.id) {
          store
            .dispatch(CHANGE_PROJECT, {
              id: props.id,
              nome: nomeDoProjeto.value,
            })
            .then(() => _handlerSuccess())
            .catch(() => _handlerFail());
        } else {
          store
            .dispatch(ADD_PROJECT, nomeDoProjeto)
            .then(() => _handlerSuccess())
            .catch(() => _handlerFail());
        }
      };

      return {
        nomeDoProjeto,
        salvar,
      };
    },
  });
</script>
