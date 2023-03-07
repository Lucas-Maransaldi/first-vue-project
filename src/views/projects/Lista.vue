<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.nome }}</td>
          <td>
            <router-link :to="`/projetos/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button is-danger ml-2" @click="_excluir(project.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
  import { useStore } from '@/store';
  import { EXCLUIR_PROJETO } from '@/store/mutations';
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'ListaDeProjetos',
    setup() {
      const store = useStore();
      return {
        projects: computed(() => store.state.projetos),
        store,
      };
    },
    methods: {
      _excluir(id: string): void {
        this.store.commit(EXCLUIR_PROJETO, id);
      },
    },
  });
</script>
