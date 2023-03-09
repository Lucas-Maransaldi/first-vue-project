import INotificacao, { TipoDeNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/mutations";

type Notificador = {
    notificar: (titulo: string, texto: string, tipo: TipoDeNotificacao) => void;
}

export default function useNotificador(): Notificador {

    const notificar = (titulo: string, texto: string, tipo: TipoDeNotificacao): void => {
        store.commit(NOTIFICAR, { titulo, texto, tipo } as INotificacao);
    };

    return { notificar }

}

