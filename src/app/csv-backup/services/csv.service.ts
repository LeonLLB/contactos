import { Injectable } from '@angular/core';
import { DBService } from 'src/app/services/db.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {saveAs} from 'file-saver'

@Injectable()
export class CsvService {

  constructor(
    private db: DBService,
    private http: HttpClient
  ) { }

  import(){}

  export(){
    this.db.getLiveQuery()
    .subscribe((contactos)=>{
      if(contactos.length > 0){
        const extraHeaders: any[] = []
        let parsedContactos = contactos
        .sort((a,b)=>{
          return a.extraValues!.length>b.extraValues!.length ? -1 : 1 
        })
        .map(contacto=>{
          let contactoParseado: {[x:string]:any} = {}
          for (const [key,value] of Object.entries(contacto)) {
            if(key === 'extraValues'){
              //Get headers first
              for(const extraValue of value){
                if(!extraHeaders.includes(extraValue.label)) extraHeaders.push(extraValue.label)
              }
              for (const i in extraHeaders) {
                contactoParseado[extraHeaders[i]] = (
                  value[i]?.value === undefined ||
                  value[i]?.value === null
                ) ? '' : value[i].value
              }
              continue;
            }
            contactoParseado[key] = (value === null) ? '' : value
          }
          return contactoParseado
        })
        parsedContactos = parsedContactos.sort((a,b) => a['id']>b['id'] ? 1 : -1)
        this.http.post('http://localhost:3000/export',parsedContactos,{
          responseType:'blob',
        })
        .subscribe(data=>{
          console.log(data)
          saveAs(data,`${new Date().getTime()}-contactos-backup.csv`)
        })
      }
    })
  }

}
