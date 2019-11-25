export class SolicitacaoEvento {

    constructor(fromUser: number, nomeFromUser:string, toUser: number, eventId: number, nomeEvento: string, dataEvento: string, localEvento: string, private utilSvc){
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.eventId = eventId;
        this.nomeFromUser = nomeFromUser;
        this.nomeEvento = nomeEvento;
        this.dataEvento = this.utilSvc.montarDataExtenso(dataEvento);
        this.localEvento = localEvento;
    }

    fromUser: number;
    toUser: number;
    eventId: number;
    nomeFromUser: string;
    nomeEvento: string;
    dataEvento: string;
    localEvento: string;
}