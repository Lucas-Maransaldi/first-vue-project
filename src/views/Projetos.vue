<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
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

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.nome }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
  import IProjeto from "@/interfaces/IProjeto";
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Projetos",
    data() {
      return {
        nomeDoProjeto: "",
        projects: [] as IProjeto[],
      };
    },
    methods: {
      salvar(): void {
        const projeto: IProjeto = {
          nome: this.nomeDoProjeto,
          id: new Date().toISOString(),
        };
        this.projects.push(projeto);
      },
    },
  });
</script>

<style scoped>
  .projetos {
    padding: 1.25rem;
  }
</style>
