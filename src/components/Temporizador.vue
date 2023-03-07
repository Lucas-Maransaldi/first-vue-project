<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometerDisplay :tempo-em-segundos="tempoEmSegundos" />
        <button class="button" @click="iniciar"  :disabled="isActive">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizer" :disabled="!isActive">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import CronometerDisplay from './CronometerDisplay.vue';

    export default defineComponent({
    name: 'Temporizador',
    components: {
        CronometerDisplay
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometroRef: 0,
            isActive: false
        }
    },
    methods: {
        iniciar() {
            this.cronometroRef = setInterval(() => {
                this.tempoEmSegundos++;
            }, 1000);
            this.isActive = true;
        },
        finalizer() {
            clearInterval(this.cronometroRef);
            this.isActive = false;
            this.$emit('finalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    },
    emits: [
        'finalizado'
    ]
});
</script>

<style lang="css" scoped>

</style>