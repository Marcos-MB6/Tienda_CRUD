import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../services/usuarios.service';
import DataGrid from "devextreme/ui/data_grid";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  datosListaUsuarios: any[] = [];
  dataGridInstanceListaUsuarios: any;


  constructor(private http: HttpClient, public dialog: MatDialog, public listaUsuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.listaUsuariosService.listaUsuarios().subscribe({
      next: (datos) => {
        this.datosListaUsuarios = datos as any[];
      },
      error: (error) => {
        console.error('ERROR', error);
      }
    });
  }

  delete() {
    var element = document.getElementById("dataGridUsuarios");
    this.dataGridInstanceListaUsuarios = DataGrid.getInstance(element!) as DataGrid;
    console.log(this.dataGridInstanceListaUsuarios.getSelectedRowsData());

    this.listaUsuariosService.eliminar({ data: this.dataGridInstanceListaUsuarios.getSelectedRowsData()[0] }).subscribe({
      next: () => {
        console.log('Se ha eliminado');

        this.ngOnInit();
      },
      error: (error) => {
        console.error('ERROR', error);
      }
    });
  }
}
