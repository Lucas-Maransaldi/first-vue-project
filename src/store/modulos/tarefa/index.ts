import useNotificador from "@/hooks/notificador";
import httpClient from "@/http";
import { TipoDeNotificacao } from "@/interfaces/INotificacao";
import ITarefa from "@/interfaces/ITarefa";
import { State } from "@/store";
import { ADD_TAREFA, CHANGE_TAREFA, GET_TAREFAS } from "@/store/actions";
import { ADICIONA_TAREFA, ALTERA_TAREFA, SET_TAREFAS } from "@/store/mutations";
import { AxiosResponse } from "axios";
import { Module } from "vuex";

export interface TarefaState {
    tarefas: ITarefa[];
}

export const tarefa: Module<TarefaState, State> = {
    mutations:{
        [ALTERA_TAREFA](state, tarefaToBeChanged: ITarefa) {
            const index = state.tarefas.findIndex(tarefa => tarefa.id === tarefaToBeChanged.id);
            state.tarefas[index] = tarefaToBeChanged;
        },
        [SET_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
    },
    actions: {
        [CHANGE_TAREFA]({ commit }, tarefa: ITarefa) {
            httpClient.put<ITarefa>(`tarefas/${tarefa.id}`, tarefa)
                .then((tarefaAdicionada) => commit(ALTERA_TAREFA, tarefaAdicionada.data));
        },
        [ADD_TAREFA]({commit}, tarefa: ITarefa) {
            httpClient.post<ITarefa>('/tarefas', tarefa )
                .then((tarefaAdicionada) => {
                    console.log(tarefaAdicionada);
                    commit(ADICIONA_TAREFA, tarefaAdicionada.data);
                });
        },
        [GET_TAREFAS]({commit}, filtro: string) {
            httpClient.get<ITarefa[]>('tarefas', {params: (filtro ? {descricao: filtro}: {})})
                .then((tarefas: AxiosResponse<ITarefa[]>) => commit(SET_TAREFAS, tarefas.data))
                .catch(() => useNotificador().notificar('Erro', 'Falha em obter tarefas', TipoDeNotificacao.FALHA))
        }
    }
}
