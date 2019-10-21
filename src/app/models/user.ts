import { Interesse } from './interesses';
import * as moment from 'moment';
import { UserService } from '../services/user_service/user.service';

export class User {

    constructor(id: string, name: string, dtnascimento: string, bio: string, estadoCivil: string, interesses: Interesse[], uSvc: UserService) {
        this.id = id;
        this.name = name;
        this.firstName = name.split(" ")[0];
        this.dtnascimento = dtnascimento;
        this.idade = this.getIdade(dtnascimento);
        this.bio = bio;
        this.siglaEstadoCivil = estadoCivil;
        this.estadoCivil = uSvc.getEstadoCivil(estadoCivil);
        this.interesses = interesses;
    }

    id: string;
    name: string;
    firstName: string;
    dtnascimento: string;
    idade: string;
    sexo: string
    bio: string;
    siglaEstadoCivil: string;
    estadoCivil: string;
    interesses: Interesse[];

    private getIdade(dtnascimento): string {
        return moment().diff(dtnascimento, 'years').toString();
    }
}


