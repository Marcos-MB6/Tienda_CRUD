import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogProductoComponent } from './dialog-producto/dialog-producto.component';
import { ProductoService } from './services/producto.service';
import DataGrid from "devextreme/ui/data_grid";
import { VentaService } from './services/venta.service';
import { DialogVentaComponent } from './dialog-venta/dialog-venta.component';
import { PedidoService } from './services/pedido.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  // datosProductos: any[] = [];
  datosVentas: any[] = [];
  // datosPedidos: any[] = [];
  // dataGridInstanceProductos: any;
  // dataGridInstanceVentas: any;
  // dataGridInstancePedidos: any;

  constructor() { }


  ngOnInit() {
    // this.productoService.obtenerListaProductos().subscribe({
    //   next: (datos) => {
    //     this.datosProductos = datos;
    //   },
    //   error: (error) => {
    //     console.error('Hubo un error al conectar con la API (productos)', error);
    //   }
    // });

    // this.ventaService.obtenerDatosVentas().subscribe({
    //   next: (datos) => {
    //     this.datosVentas = datos;
    //     console.log('FURRULA');
    //   },
    //   error: (error) => {
    //     console.error('Hubo un error al conectar con la API (ventas)', error);
    //   }
    // })

    // this.pedidoService.obtenerListaPedidos().subscribe({
    //   next: (datos) => {
    //     this.datosPedidos = datos;
    //     console.log(this.datosPedidos);
    //   },
    //   error: (error) => {
    //     console.error('Hubo un error al conectar con la API (pedidos)', error);
    //   }
    // });

  }

  // openDialog(): void {
  //   var element = document.getElementById("dataGridProductos");
  //   this.dataGridInstanceProductos = DataGrid.getInstance(element!) as DataGrid;
  //   console.log(this.dataGridInstanceProductos.getSelectedRowsData());

  //   const dialogRef = this.dialog.open(DialogProductoComponent, {
  //     width: '250px',

  //     data: this.dataGridInstanceProductos.getSelectedRowsData()
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     console.log('Se ha cerrado la ventana de los productos');

  //     this.ngOnInit();

  //   });
  // }

  // openDialogVentas(): void {
  //   const dialogRef = this.dialog.open(DialogVentaComponent, {
  //     width: '550px',


  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     console.log('Se ha cerrado la ventana de las ventas');

  //     this.ngOnInit();

  //   });
  // }


  // delete() {
  //   var element = document.getElementById("dataGridProductos");
  //   this.dataGridInstanceProductos = DataGrid.getInstance(element!) as DataGrid;
  //   console.log(this.dataGridInstanceProductos.getSelectedRowsData());

  //   this.productoService.eliminar({ data: this.dataGridInstanceProductos.getSelectedRowsData()[0] }).subscribe({
  //     next: () => {
  //       console.log('Se ha eliminado');

  //       this.ngOnInit();
  //     },
  //     error: (error) => {
  //       console.error('Hubo un error al conectar con la API', error);
  //     }
  //   });
  // }


  // deletePedido() {
  //   var element = document.getElementById("dataGridVentasCabecera");
  //   this.dataGridInstancePedidos = DataGrid.getInstance(element!) as DataGrid;
  //   console.log(this.dataGridInstancePedidos.getSelectedRowsData());

  //   this.pedidoService.eliminarPedido({ data: this.dataGridInstancePedidos.getSelectedRowsData()[0] }).subscribe({
  //     next: () => {
  //       console.log('Se ha eliminado');

  //       this.ngOnInit();
  //     },
  //     error: (error) => {
  //       console.error('Hubo un error al conectar con la API', error);
  //     }
  //   });
  // }

}

