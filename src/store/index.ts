import useNotificador from "@/hooks/notificador";
import httpClient, { httpClientObservable } from "@/http";
import INotificacao, { TipoDeNotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { map, take } from "rxjs";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, CHANGE_PROJECT, DELETE_PROJECT, GET_PROJECT } from "./actions";
import { ADICIONA_PROJETO, ALTERA_PPROJETO, EXCLUIR_PROJETO, NOTIFICAR, SET_PROJETOS } from "./mutations";

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
                id: new Date().getTime(),
                nome: nomeDoProjeto
            };
            state.projetos.push(projeto);
        },
        [ALTERA_PPROJETO](state, projectToBeChanged: IProjeto) {
            const index = state.projetos.findIndex(project => project.id === projectToBeChanged.id);
            state.projetos[index] = projectToBeChanged;
        },
        [EXCLUIR_PROJETO](state, id: number) {
            state.projetos = state.projetos.filter(projeto => projeto.id !== id);
        },
        [SET_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
        [NOTIFICAR](state, notificacao: INotificacao) {
            notificacao.id = new Date().getTime();
            state.notificacoes.push(notificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter((notificacaoState) => notificacaoState.id !== notificacao.id) 
            }, notificacao.duracao || 1000);
        }
    },
    actions: {
        [GET_PROJECT]({ commit }) {
            httpClientObservable.get<IProjeto[]>('projetos')
                .pipe(take(1), map((axiosData) => axiosData.data))
                .subscribe({
                    next: (projects) => {
                        commit(SET_PROJETOS, projects);
                        useNotificador().notificar('Sucesso', 'Projetos carregados com sucesso', TipoDeNotificacao.SUCESSO);
                    },
                    error: () => useNotificador().notificar('Erro', 'Falha em carregamento de projetos', TipoDeNotificacao.FALHA)
                })
            },
        [DELETE_PROJECT]({commit}, idProjeto: string) {
            httpClientObservable.delete(`projetos/${idProjeto}`)
                .pipe(take(1))
                .subscribe({
                    next: () => {
                        commit(EXCLUIR_PROJETO, idProjeto);
                        useNotificador().notificar('Sucesso', 'Projetos deletado com sucesso', TipoDeNotificacao.SUCESSO)
                    },
                    error: () => useNotificador().notificar('Erro', 'Falha em deletar o projetos', TipoDeNotificacao.FALHA)
                })
        },
        [ADD_PROJECT](store, nomeProjeto: string) {
            httpClient.post<IProjeto>('projetos', { nome: nomeProjeto});
        },
        [CHANGE_PROJECT](store, projeto: IProjeto) {
            httpClient.put<IProjeto>(`projetos/${projeto.id}`, projeto);
        }
    }
});

export function useStore(): Store<State> {
    return vuexUseStore(key);
}
