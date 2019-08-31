import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:44333/api';
  API_CPF_URL = 'https://viacep.com.br/ws/{cep}/json/';

  constructor() { }
}
