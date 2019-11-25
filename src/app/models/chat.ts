export class Chat {

    constructor(person1Id: number, person2Id: number, chatId: number, chatName: string){
        this.person1Id = person1Id;
        this.person2Id = person2Id;
        this.chatId = chatId;
        this.chatName = chatName;
    }

    person1Id: number;
    person2Id: number;
    chatId: number;
    chatName: string
}