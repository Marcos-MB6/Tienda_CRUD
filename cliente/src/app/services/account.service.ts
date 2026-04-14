import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:7280/';

  constructor(private http: HttpClient) { }


  login(model: any) {
    return this.http.post(this.baseUrl + 'User/login', model);
  }

  listaUsuarios() {
    return this.http.get(this.baseUrl + 'User/lista');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'User/register', model);
  }

}
