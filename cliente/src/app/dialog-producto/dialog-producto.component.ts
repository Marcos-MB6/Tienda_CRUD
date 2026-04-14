import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../models/productoInterface';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.scss']
})
export class DialogProductoComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  constructor(public productoService: ProductoService) { }
  readonly dialogRef = inject(MatDialogRef<DialogProductoComponent>);
  data = inject(MAT_DIALOG_DATA);

  nuevoProducto: Producto = {
    nombre: '',
    marca: '',
    tipo: '',
    imagen: ''
  };


  ngOnInit(): void {
    console.log(this.data);
    this.initializedForm();
  }

  initializedForm() {
    if (this.data.length > 0) {
      this.registerForm = new FormGroup({
        id: new FormControl(this.data[0].id),
        nombre: new FormControl(this.data[0].nombre),
        precio: new FormControl(this.data[0].precio),
        marca: new FormControl(this.data[0].marca),
        tipo: new FormControl(this.data[0].tipo),
        imagen: new FormControl(this.data[0].imagen)
      })

    } else {
      this.registerForm = new FormGroup({
        id: new FormControl(),
        nombre: new FormControl(),
        precio: new FormControl(),
        marca: new FormControl(),
        tipo: new FormControl(),
        imagen: new FormControl()
      })
    }

  }

  async recibirImagen(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.registerForm.patchValue({
        imagen: reader.result
      });
    };
  }

  async cerrar() {

    console.log("-----GUARDANDO-----");
    console.log(this.registerForm.value.imagen);
    console.log("--------------------");

    this.nuevoProducto.id = this.registerForm.value.id;
    this.nuevoProducto.nombre = this.registerForm.value.nombre;
    this.nuevoProducto.precio = this.registerForm.value.precio;
    this.nuevoProducto.marca = this.registerForm.value.marca;
    this.nuevoProducto.tipo = this.registerForm.value.tipo;
    this.nuevoProducto.imagen = this.registerForm.value.imagen;


    console.log("-----GUARDANDO PRODUCTO-----");
    console.log(this.nuevoProducto);
    console.log("--------------------");

    if (this.data.length === 0) {

      this.productoService.crearNuevo({ data: this.nuevoProducto }).subscribe({
        next: () => {
          this.dialogRef.close();
        }
      })

    } else {
      this.productoService.actualizar({ data: this.nuevoProducto }).subscribe({
        next: () => {
          this.dialogRef.close();
        }
      })
    }
  }
  cancelar() {
    this.dialogRef.close();
  }

}