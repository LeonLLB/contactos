import { Component, OnInit } from '@angular/core';
import { CsvService } from '../../services/csv.service';

@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styles: [
  ]
})
export class ExportCsvComponent implements OnInit {

  constructor(
    private csv: CsvService
  ) { }

  ngOnInit(): void {
  }

  generateCsv(){
    this.csv.export()
  }

}
