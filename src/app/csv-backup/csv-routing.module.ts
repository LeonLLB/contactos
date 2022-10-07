import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainCsvComponent } from './main-csv/main-csv.component';

const routes: Route[] = [
  {path: '',children:[
    {path:'', pathMatch:'full',component:MainCsvComponent},
    {path:'**',redirectTo:'csv'}
  ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CsvRoutingModule { }
