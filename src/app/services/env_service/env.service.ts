import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:44333/api';
  API_CPF_URL = 'https://viacep.com.br/ws/{cep}/json/';
  API_GEO_URL = 'https://maps.googleapis.com/maps/api/geocode/json?&address={cep}&key=AIzaSyCtLPw3fu3mrhUllabumByLnRb0frinbfs'

  constructor() { }
}
