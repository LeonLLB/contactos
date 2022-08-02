import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { ExportCsvComponent } from './export-csv/export-csv.component';
import { MainCsvComponent } from './main-csv/main-csv.component';



@NgModule({
  declarations: [
    ImportCsvComponent,
    ExportCsvComponent,
    MainCsvComponent
  ],
  exports:[
    MainCsvComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class CsvBackupModule { }
