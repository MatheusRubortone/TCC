import { UtilService } from '../services/util_service/util.service';

export class Evento {

    constructor(id: string, title: string, ownerId: string, description: string, startDate: string, endDate: string, place: string, address: string, cep: string, state: string, private utilSvc: UtilService) {
        this.id = id;
        this.title = title;
        this.ownerId = ownerId;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.place = place;
        this.address = address;
        this.cep = cep;
        this.starDateExtenso = this.utilSvc.montarDataExtenso(startDate);
        this.diaInicioEvento = this.utilSvc.getDiaEvento(startDate);
        this.mesResEvento = this.utilSvc.getMesResPeloNumero(this.startDate.split(" ")[0].split("/")[0]);
        this.startDateDesc = this.utilSvc.getDataDescricao(this.startDate);
        this.endDateDesc = this.utilSvc.getDataDescricao(this.endDate);

        switch (state) {
            case "I":
                this.saved = true;
                this.confirmed = false;
                break;
            case "C":
                this.saved = false;
                this.confirmed = true;
                break;
            case "X":
                this.saved = false;
                this.confirmed = false;
                break;
            default:
                this.saved = false;
                this.confirmed = false;
                break;
        }

    }

    id: string;
    title: string;
    ownerId: string;
    description: string;
    startDate: string;
    endDate: string;
    place: string;
    address: string;
    cep: string;
    starDateExtenso: string;
    diaInicioEvento: string;
    mesResEvento: string;
    startDateDesc: string;
    endDateDesc: string;
    saved: boolean;
    confirmed: boolean;
}