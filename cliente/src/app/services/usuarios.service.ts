import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  baseUrl = 'http://localhost:7280/';

  constructor(private http: HttpClient) { }

  listaUsuarios() {
    return this.http.get(this.baseUrl + 'User/lista');
  }

  eliminar(model: any) {
    return this.http.delete(this.baseUrl + 'User/eliminar/' + model.data.id, model.data);
  }
}
