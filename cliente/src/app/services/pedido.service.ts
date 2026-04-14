import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }


  obtenerListaPedidos() {
    return this.http.get<any[]>('http://localhost:7280/api/VentaCabecera/lista')
  }


  crearPedido(e: any) {
    return this.http.post('http://localhost:7280/api/VentaCabecera', e)
  }


  eliminarPedido(e: any) {
    return this.http.delete('http://localhost:7280/api/VentaCabecera/eliminar/' + e.data.id, e.data)
  }
}
