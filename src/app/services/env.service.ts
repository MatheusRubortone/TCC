import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'https://b19cacfd-823a-440e-a3db-ebbe4a40a39c.mock.pstmn.io/';

  constructor() { }
}
