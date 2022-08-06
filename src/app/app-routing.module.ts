import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {path:'contactos',loadChildren: () => import('./contactos/contactos.module').then(m => m.ContactosModule)},
  {path:'csv',loadChildren:()=> import('./csv-backup/csv-backup.module').then(m=>m.CsvBackupModule)},
  {path:'**',redirectTo:'/contactos'}
] 

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
