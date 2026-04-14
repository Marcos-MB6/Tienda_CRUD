import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../services/producto.service';
import { DialogProductoComponent } from '../dialog-producto/dialog-producto.component';
import DataGrid from "devextreme/ui/data_grid";

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  datosProductos: any[] = [];
  dataGridInstanceProductos: any;

  constructor(private http: HttpClient, public dialog: MatDialog, public productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.obtenerListaProductos().subscribe({
      next: (datos) => {
        this.datosProductos = datos;
      },
      error: (error) => {
        console.error('Hubo un error al conectar con la API (productos)', error);
      }
    });
  }

  openDialog(): void {
    var element = document.getElementById("dataGridProductos");
    this.dataGridInstanceProductos = DataGrid.getInstance(element!) as DataGrid;
    console.log(this.dataGridInstanceProductos.getSelectedRowsData());

    const dialogRef = this.dialog.open(DialogProductoComponent, {
      width: '250px',

      data: this.dataGridInstanceProductos.getSelectedRowsData()
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Se ha cerrado la ventana de los productos');

      this.ngOnInit();

    });
  }

  delete() {
    var element = document.getElementById("dataGridProductos");
    this.dataGridInstanceProductos = DataGrid.getInstance(element!) as DataGrid;
    console.log(this.dataGridInstanceProductos.getSelectedRowsData());

    this.productoService.eliminar({ data: this.dataGridInstanceProductos.getSelectedRowsData()[0] }).subscribe({
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
