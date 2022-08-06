import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ContactoFormComponent } from './contacto-form/contacto-form.component';
import { ContactoInfoComponent } from './contacto-info/contacto-info.component';
import { MainContactosComponent } from './main-contactos/main-contactos.component';

const routes : Route[] = [
  {path:'', children:[
    {path:'',pathMatch:'full',component:MainContactosComponent},
    {path:'registrar',component:ContactoFormComponent},
    {path:'modificar/:id',component:ContactoFormComponent},
    {path:':id',component:ContactoInfoComponent},
    {path:'**',redirectTo:'/contactos'},
  ]},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ContactoRoutingModule { }
