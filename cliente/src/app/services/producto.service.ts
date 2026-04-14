import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  obtenerListaProductos() {
    return this.http.get<any[]>('http://localhost:7280/api/Producto/lista')
  }

  crearNuevo(e: any) {
    return this.http.post('http://localhost:7280/api/Producto', e.data)
  }
 
  actualizar(e: any) {
    return this.http.put('http://localhost:7280/api/Producto/actualizar/' + e.data.id, e.data)
  }

  eliminar(e: any) {
    return this.http.delete('http://localhost:7280/api/Producto/eliminar/' + e.data.id, e.data)
  }
}
