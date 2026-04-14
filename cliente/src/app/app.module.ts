import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxDataGridModule, DxDataGridComponent, DxToolbarModule, DxButtonModule } from "devextreme-angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogProductoComponent } from './dialog-producto/dialog-producto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogVentaComponent } from './dialog-venta/dialog-venta.component';
import { DialogPedidoComponent } from './dialog-pedido/dialog-pedido.component';
import { DxListModule } from "devextreme-angular";
import { TiendaComponent } from './tienda/tienda.component';
import { CarritoComponent } from './carrito/carrito.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UsuariosComponent } from './usuarios/usuarios.component';



@NgModule({
  declarations: [
    AppComponent,
    DialogProductoComponent,
    DialogVentaComponent,
    DialogPedidoComponent,
    TiendaComponent,
    CarritoComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxDataGridModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DxToolbarModule,
    DxButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DxListModule,
    DxDataGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

