<template>
    <div class="box formulario">
        <div  class="columns">
            <div class="column is-8" role="form" aria-label="Formulario para criação de nova tarefa">
                <input class="input" type="text" v-model="descricao" placeholder="Qual tarefa você deseja iniciar?"/>
            </div>
            <div class="column">
                <Temporizador @finalizado="finalizarTarefa($event)"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';

export default defineComponent({
    name: 'FormularioPrincipal',
    components: {
        Temporizador
    },
    data() {
        return {
            descricao: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorido: number): void {
            this.$emit('tarefaFinalizada', { descricao: this.descricao , tempoEmSegundos: tempoDecorido })
            this.descricao = '';
        },
    },
    emits: ['tarefaFinalizada']
});
</script>
<style>

.formulario {
    background: var(--bg-primario);
    color: var(--texto-primario);
}
    
</style>