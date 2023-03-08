import INotificacao from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PPROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./mutations";

interface State {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

const defaultState: State = {
    projetos: [],
    notificacoes: []
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
            state.projetos.push(projeto);
        },
        [ALTERA_PPROJETO](state, projectToBeChanged: IProjeto) {
            const index = state.projetos.findIndex(project => project.id === projectToBeChanged.id);
            state.projetos[index] = projectToBeChanged;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projeto => projeto.id !== id);
        },
        [NOTIFICAR](state, notificacao: INotificacao) {
            notificacao.id = new Date().getTime();
            state.notificacoes.push(notificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter((notificacaoState) => notificacaoState.id !== notificacao.id) 
            }, notificacao.duracao || 500);
        }
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}
