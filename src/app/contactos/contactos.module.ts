import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContactosComponent } from './main-contactos/main-contactos.component';
import { ContactoCardComponent } from './contacto-card/contacto-card.component';
import { ContactoFormComponent } from './contacto-form/contacto-form.component';
import { ContactoInfoComponent } from './contacto-info/contacto-info.component';
import { ContactoRoutingModule } from './contactos-routing.module';
import { ContactosComponent } from './contactos.component';



@NgModule({
  declarations: [
    MainContactosComponent,
    ContactoCardComponent,
    ContactoFormComponent,
    ContactoInfoComponent,
    ContactosComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    ContactoRoutingModule
  ]
})
export class ContactosModule { }
