import INotificacao from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ProjectState, projeto } from "./modulos/projeto";
import { tarefa, TarefaState } from "./modulos/tarefa";
import { NOTIFICAR } from "./mutations";

export interface State {
    notificacoes: INotificacao[],
    tarefa: TarefaState,
    projeto: ProjectState
}

const defaultState: State = {
    notificacoes: [],
    tarefa: {
        tarefas: []
    },
    projeto: {
        projetos: []
    }
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: defaultState,
    mutations: {
        [NOTIFICAR](state, notificacao: INotificacao) {
            notificacao.id = new Date().getTime();
            state.notificacoes.push(notificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter((notificacaoState) => notificacaoState.id !== notificacao.id) 
            }, notificacao.duracao || 1000);
        }
    },
    actions: {
    },
    modules: {
        projeto,
        tarefa
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}
