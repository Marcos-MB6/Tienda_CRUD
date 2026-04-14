import { Producto } from "./productoInterface"

export interface Venta {
    id?: number,
    cantidad: number,
    dineroTotal: number,
    productoId?: number,
    ventaCabeceraId?: number,
    producto?: Producto
}