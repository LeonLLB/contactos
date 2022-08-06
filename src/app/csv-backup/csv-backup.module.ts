import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { ExportCsvComponent } from './export-csv/export-csv.component';
import { MainCsvComponent } from './main-csv/main-csv.component';
import { CsvBackupComponent } from './csv-backup.component';
import { CsvRoutingModule } from './csv-routing.module';



@NgModule({
  declarations: [
    ImportCsvComponent,
    ExportCsvComponent,
    MainCsvComponent,
    CsvBackupComponent
  ],
  imports: [
    CommonModule,
    CsvRoutingModule
  ]
})
export class CsvBackupModule { }
