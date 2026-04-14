import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VentaService } from '../services/venta.service';
import { Venta } from '../models/ventaInterface';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedidoInterface';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/productoInterface';
import { FormatWidth } from '@angular/common';

@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.scss']
})
export class DialogVentaComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  constructor( public pedidoService: PedidoService, public productoService: ProductoService, public fb: FormBuilder) { }

  readonly dialogRef = inject(MatDialogRef<DialogVentaComponent>);
  data = inject(MAT_DIALOG_DATA);


  listaProductos: Producto[] = [];


  nuevoPedido: Pedido = {
    ventas: [],
    precioTotal: 0
  }

  ngOnInit(): void {

    this.productoService.obtenerListaProductos().subscribe({
      next: (productos) => {
        this.listaProductos = productos;
      },
      error: (err) => console.error('Error al obtener productos:', err)
    });

    this.formulario();
  }

  formulario(): void {
    this.registerForm = this.fb.group({
      productosCarrito: this.fb.array([
        this.fb.group({
          producto: [''],
          cantidad: ['']
        })
      ])
    });
  }

  get productosCarrito(): FormArray {
    return this.registerForm.get('productosCarrito') as FormArray;
  }

  agregarProducto(): void {
    this.productosCarrito.push(
      this.fb.group({ producto: [''], cantidad: [''] })
    );
  }

  eliminarProducto(index: number): void {
    this.productosCarrito.removeAt(index);
  }

  cerrar() {

    this.nuevoPedido.ventas = this.productosCarrito.value.map((item: any) => ({
      productoId: item.producto,
      cantidad: item.cantidad,
      dineroTotal: 0
    }));


    this.pedidoService.crearPedido(this.nuevoPedido).subscribe({
      next: (pedidoCreado: Pedido) => {

        console.log("-------------------------");
        console.log(pedidoCreado);
        console.log("-------------------------");

        // for (let x = 0; x < pedidoCreado.ventas!.length; x++) {
        //   this.nuevaVenta.cantidad = pedidoCreado.ventas![x].cantidad;
        //   this.nuevaVenta.productoId = pedidoCreado.ventas![x].productoId;
        //   this.nuevaVenta.ventaCabeceraId = pedidoCreado.id;

        //   this.ventaService.crearNuevaVenta(this.nuevaVenta).subscribe({
        //     next: () => {
        //       console.log("Se ha creado 1 venta mas");
        //     },
        //     error: (err) => console.error('Error al crear venta:', err)
        //   });
        // }
        this.dialogRef.close();
      },
      error: (err) => console.error('Error al crear pedido:', err)
    });


  }
  cancelar() {
    this.dialogRef.close();
  }

}
