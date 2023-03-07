import IProjeto from "./IProjeto";

export default interface ITarefa {
    descricao: string;
    tempoEmSegundos: number;
    projeto: IProjeto;
}
