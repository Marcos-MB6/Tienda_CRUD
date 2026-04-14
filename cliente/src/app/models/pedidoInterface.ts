import { Venta } from "./ventaInterface";

export interface Pedido {
    id?: number,
    ventas?: Venta[],
    precioTotal?: number
}