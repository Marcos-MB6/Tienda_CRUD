import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../services/pedido.service';
import { DialogVentaComponent } from '../dialog-venta/dialog-venta.component';
import { VentaService } from '../services/venta.service';
import DataGrid from "devextreme/ui/data_grid";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  datosPedidos: any[] = [];
  dataGridInstanceVentas: any;
  dataGridInstancePedidos: any;

  constructor(private http: HttpClient, public dialog: MatDialog, public pedidoService: PedidoService, public ventaService: VentaService) { }

  ngOnInit(): void {
    this.pedidoService.obtenerListaPedidos().subscribe({
      next: (datos) => {
        this.datosPedidos = datos;
        console.log(this.datosPedidos);
      },
      error: (error) => {
        console.error('Hubo un error al conectar con la API (pedidos)', error);
      }
    });
  }

  openDialogVentas(): void {
    const dialogRef = this.dialog.open(DialogVentaComponent, {
      width: '550px',


    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Se ha cerrado la ventana de las ventas');

      this.ngOnInit();

    });
  }


  deletePedido() {
    var element = document.getElementById("dataGridVentasCabecera");
    this.dataGridInstancePedidos = DataGrid.getInstance(element!) as DataGrid;
    console.log(this.dataGridInstancePedidos.getSelectedRowsData());

    this.pedidoService.eliminarPedido({ data: this.dataGridInstancePedidos.getSelectedRowsData()[0] }).subscribe({
      next: () => {
        console.log('Se ha eliminado');

        this.ngOnInit();
      },
      error: (error) => {
        console.error('Hubo un error al conectar con la API', error);
      }
    });
  }

}
