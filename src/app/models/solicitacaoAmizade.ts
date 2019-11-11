
export class SolicitacaoAmizade {

    constructor(fromUser: number, toUser: number, friendship: number, nomeFromUser: string){
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.friendshipId = friendship;
        this.nomeFromUser = nomeFromUser;
    }

    fromUser: number;
    toUser: number;
    friendshipId: number;
    nomeFromUser: string;
}