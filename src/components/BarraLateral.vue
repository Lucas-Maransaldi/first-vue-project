<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="logo do Alura tracker">
        </h1>
        <button class="button" @click="_toggleTheme">
            {{ _buttonText }}
        </button>
    </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'BarraLateral',
    emits: ['toggleTheme'],
    data() {
        return {
            isDarkTheme: false
        }
    },
    computed: {
        _buttonText(): string {
            return (this.isDarkTheme) ? 'Desativar modo escuro' : 'Ativar modo escuro'
        }
    },
    methods: {
        _toggleTheme(): void {
            this.isDarkTheme = !this.isDarkTheme;
            this.$emit('toggleTheme', this.isDarkTheme)
        }
    }
});
</script>
<style scoped>

    header {
        padding: 1rem;
        background: #0d3b66;
        width: 100%;
        height: 100vh;
        text-align: center;
    }

    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
    
</style>