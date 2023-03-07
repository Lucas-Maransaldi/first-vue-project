import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PPROJETO, EXCLUIR_PROJETO } from "./mutations";

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
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto: IProjeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            };
            console.log(projeto);
            state.projetos.push(projeto);
        },
        [ALTERA_PPROJETO](state, projectToBeChanged: IProjeto) {
            const index = state.projetos.findIndex(project => project.id === projectToBeChanged.id);
            state.projetos[index] = projectToBeChanged;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projeto => projeto.id !== id);
        }
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}
