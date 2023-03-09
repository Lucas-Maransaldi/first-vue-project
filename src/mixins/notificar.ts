import INotificacao, { TipoDeNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/mutations";

export const notificacaoMixin = {
    methods: {
        notificar(titulo: string, texto: string, tipo: TipoDeNotificacao): void {
            store.commit(NOTIFICAR, { titulo, texto, tipo } as INotificacao);
          },
    }
}