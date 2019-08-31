export class Evento{

    constructor(nome: string, data: string, localEvento: string){
        this.nomeEvento = nome;
        this.dataEvento = data;
        this.localEvento = localEvento;
    }

    id: string;
    nomeEvento: string;
    dataEvento: string;
    descEvento: string;
    localEvento: string;
}