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
  import { DELETE_PROJECT, GET_PROJECT } from '@/store/actions';
  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    name: 'ListaDeProjetos',
    setup() {
      const store = useStore();
      store.dispatch(GET_PROJECT);
      return {
        projects: computed(() => store.state.projetos),
        store,
      };
    },
    methods: {
      _excluir(id: number): void {
        this.store.dispatch(DELETE_PROJECT, id);
      },
    },
  });
</script>
