import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ImportCsvComponent } from './components/import-csv/import-csv.component';
import { ExportCsvComponent } from './components/export-csv/export-csv.component';
import { MainCsvComponent } from './main-csv/main-csv.component';
import { CsvBackupComponent } from './csv-backup.component';
import { CsvRoutingModule } from './csv-routing.module';
import { CsvService } from './services/csv.service';



@NgModule({
  declarations: [
    ImportCsvComponent,
    ExportCsvComponent,
    MainCsvComponent,
    CsvBackupComponent
  ],
  imports: [
    CommonModule,
    CsvRoutingModule,
    HttpClientModule
  ],
  providers:[
    CsvService
  ]
})
export class CsvBackupModule { }
