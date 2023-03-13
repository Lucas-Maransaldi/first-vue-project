import useNotificador from "@/hooks/notificador";
import httpClient, { httpClientObservable } from "@/http";
import { TipoDeNotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { State } from "@/store";
import { ADD_PROJECT, CHANGE_PROJECT, DELETE_PROJECT, GET_PROJECT } from "@/store/actions";
import { ADICIONA_PROJETO, ALTERA_PPROJETO, EXCLUIR_PROJETO, SET_PROJETOS } from "@/store/mutations";
import { map, take } from "rxjs";
import { Module } from "vuex";

export interface ProjectState { 
    projetos: IProjeto[];
}

export const projeto: Module<ProjectState, State> = {
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
        },
    }
}
