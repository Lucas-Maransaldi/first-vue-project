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
  import { useStore } from '@/store';
  import { ADICIONA_PROJETO, ALTERA_PPROJETO } from '@/store/mutations';
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
          (projeto) => projeto.id === this.id
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
          this.store.commit(ALTERA_PPROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto,
          });
        } else {
          this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
        }
        this.nomeDoProjeto = '';
        this.$router.push('/projetos');
      },
    },
    setup() {
      const store = useStore();
      return {
        store,
      };
    },
  });
</script>
