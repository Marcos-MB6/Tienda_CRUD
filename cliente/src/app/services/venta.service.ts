import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  obtenerDatosVentas() {
    return this.http.get<any[]>('http://localhost:7280/api/Venta/lista')
  }

  crearNuevaVenta(e: any) {
    return this.http.post('http://localhost:7280/api/Venta', e)

  }

  eliminarVenta(e: any) {
    return this.http.delete('http://localhost:7280/api/Venta/eliminar/' + e.id, e)

  }
}
