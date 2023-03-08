<template>
  <div class="notificacoes">
    <article
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
      class="message"
      :class="context[notificacao.tipo]"
    >
      <div class="message-header">{{ notificacao.titulo }}</div>
      <div class="message-body">
        {{ notificacao.texto }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import { TipoDeNotificacao } from '@/interfaces/INotificacao';
  import { useStore } from '@/store';
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'Notificacoes',
    data() {
      return {
        context: {
          [TipoDeNotificacao.SUCESSO]: 'is-success',
          [TipoDeNotificacao.ATENCAO]: 'is-warning',
          [TipoDeNotificacao.FALHA]: 'is-danger',
        },
      };
    },
    setup() {
      const store = useStore();
      return {
        notificacoes: computed(() => store.state.notificacoes),
      };
    },
  });
</script>

<style scoped>
  .notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
  }
  .message {
    animation: 300ms ease-in-out;
  }
</style>
