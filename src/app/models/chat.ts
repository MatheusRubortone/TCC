export class Chat {

    constructor(person1Id: number, person2Id: number, chatId: number, chatName: string){
        this._callerID = person1Id;
        this._calledID = person2Id;
        this.chatId = chatId;
        this.chatName = chatName;
    }

    _callerID: number;
    _calledID: number;
    chatId: number;
    chatName: string
}