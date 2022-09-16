import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contacto } from 'src/app/interfaces/contacto.interface';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-main-contactos',
  templateUrl: './main-contactos.component.html'
})
export class MainContactosComponent implements OnInit, OnDestroy {

  contactoList: Contacto[] = []
  query: string = ''
  contactoLiveQuery: any

  constructor(private DBService: DBService) { }

  ngOnInit() {
    this.contactoLiveQuery = this.DBService.getLiveQuery()
    .subscribe((contactos)=>this.contactoList = contactos)
  }

  ngOnDestroy(): void {
    this.contactoLiveQuery.unsubscribe()
  }  

  consultarContactos(){
    this.DBService.queryContactoByNombreOrApellido(this.query)
    .then(result=>this.contactoList=result)
  }

}
