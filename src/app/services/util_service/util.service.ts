import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  private getMesPeloNumero(mes: string) {
    switch (mes) {
      case "1": return "Janeiro";
      case "2": return "Fevereiro";
      case "3": return "Março";
      case "4": return "Abril";
      case "5": return "Maio";
      case "6": return "Junho";
      case "7": return "Julho";
      case "8": return "Agosto";
      case "9": return "Setembro";
      case "10": return "Outubro";
      case "11": return "Novembro";
      case "12": return "Dezembro";
    }
  }

  getMesResPeloNumero(mes: string) {
    switch (mes) {
      case "1": return "Jan";
      case "2": return "Fev";
      case "3": return "Mar";
      case "4": return "Abr";
      case "5": return "Mai";
      case "6": return "Jun";
      case "7": return "Jul";
      case "8": return "Ago";
      case "9": return "Set";
      case "10": return "Out";
      case "11": return "Nov";
      case "12": return "Dez";
    }
  }

  getDiaEvento(dataHora: string) {
    return dataHora.split(" ")[0].split("/")[0];
  }

  private getHora24(hora: string) {
    switch (hora) {
      case "1": return "13";
      case "2": return "14";
      case "3": return "15";
      case "4": return "16";
      case "5": return "17";
      case "6": return "18";
      case "7": return "19";
      case "8": return "20";
      case "9": return "21";
      case "10": return "22";
      case "11": return "23";
      case "12": return "24";
    }
  }

  montarDataExtenso(dataHora: string) {
    console.log("dataHora: " + dataHora)
    let data = dataHora.split(" ")[0];
    let hora = dataHora.split(" ")[1];

    console.log("data: " + data + " hora: " + hora + " 3:" + dataHora.split(" ")[2]);

    let arrData = data.split("/");

    let arrHora = hora.split(":");

    if (dataHora.split(" ")[2] == "PM") arrHora[0] = this.getHora24(arrHora[0]);

    console.log(arrData[0] + " de " + this.getMesPeloNumero(arrData[1]) + " de " + arrData[2] + ", " + arrHora[0] + ":" + arrHora[1]);
    return arrData[0] + " de " + this.getMesPeloNumero(arrData[1]) + " de " + arrData[2] + ", " + arrHora[0] + ":" + arrHora[1];
  }


}
