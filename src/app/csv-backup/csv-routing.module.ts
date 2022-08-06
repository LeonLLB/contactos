import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExportCsvComponent } from './export-csv/export-csv.component';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { MainCsvComponent } from './main-csv/main-csv.component';

const routes: Route[] = [
  {path: '',children:[
    {path:'', pathMatch:'full',component:MainCsvComponent},
    {path:'importar',component:ImportCsvComponent},
    {path:'export',component:ExportCsvComponent},
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
