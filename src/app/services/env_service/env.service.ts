import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:44333/api';
  // API_URL = 'http://192.168.43.186:8080/api';
  API_CPF_URL = 'https://viacep.com.br/ws/{cep}/json/';
  API_GEO_URL = 'https://maps.googleapis.com/maps/api/geocode/json?&address={cep}&key=AIzaSyCtLPw3fu3mrhUllabumByLnRb0frinbfs'
  firebaseConfig = {
    apiKey: "AIzaSyCIZQ6llohD7q-_7BfXk7Eh7DwV8kfti5s",
    authDomain: "dont-go-alone-251714.firebaseapp.com",
    databaseURL: "https://dont-go-alone-251714.firebaseio.com",
    projectId: "dont-go-alone-251714",
    storageBucket: "dont-go-alone-251714.appspot.com",
    messagingSenderId: "979096323633",
    appId: "1:979096323633:web:78946c3491b61c3d20b710",
    measurementId: "G-VBNCWJ9G5F"
  }

  constructor() { }

}