import { Component, OnInit } from '@angular/core';
import { CsvService } from '../../services/csv.service';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styles: [
  ]
})
export class ImportCsvComponent implements OnInit {

  file!: File

  constructor(
    private csv: CsvService
  ) { }

  ngOnInit(): void {
  }

  onFileChange(file: any){
    this.file = file.files[0]
  }

  onFileSubmit(){
    this.csv.import(this.file)
  }

}
