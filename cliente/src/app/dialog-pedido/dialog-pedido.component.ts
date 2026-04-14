import { Component, inject, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pedido } from '../models/pedidoInterface';

@Component({
  selector: 'app-dialog-pedido',
  templateUrl: './dialog-pedido.component.html',
  styleUrls: ['./dialog-pedido.component.scss']
})
export class DialogPedidoComponent implements OnInit {

  constructor(public pedidoService: PedidoService) { }

  readonly dialogRef = inject(MatDialogRef<DialogPedidoComponent>);
  data = inject(MAT_DIALOG_DATA);

  nuevoPedido: Pedido = {
    ventas: [],
    precioTotal: 0
  }

  ngOnInit(): void {
    this.cerrar();
  }

  cerrar() {
    this.pedidoService.crearPedido({data: this.nuevoPedido}).subscribe({
      next: () => {
        this.dialogRef.close();
      }
    })
  }

}
