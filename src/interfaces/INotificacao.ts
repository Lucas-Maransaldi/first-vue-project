export default interface INotificacao {
    titulo: string;
    texto: string;
    tipo: TipoDeNotificacao;
    id?: number;
    duracao?: number;
}

export enum TipoDeNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO
}