import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

interface State {
    projetos: IProjeto[]
}

const defaultState: State = {
    projetos: []
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: defaultState,
    mutations: {
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string) {
            const projeto: IProjeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            };
            state.projetos.push(projeto);
        }
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}
