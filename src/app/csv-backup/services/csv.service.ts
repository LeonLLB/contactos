import { Injectable } from '@angular/core';
import { DBService } from 'src/app/services/db.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {saveAs} from 'file-saver'
import { Contacto, ContactoFromCSV } from 'src/app/interfaces/contacto.interface';

@Injectable()
export class CsvService {

  constructor(
    private db: DBService,
    private http: HttpClient
  ) { }

  import(csv: File){
    const fd = new FormData()
    fd.append('file',csv)
    this.http.post<ContactoFromCSV[]>('https://csv-parser-api.onrender.com/import',fd)
    .subscribe((Contactos)=>{
      const parsedContactos = Contactos.map((contacto)=>{

        if(
          contacto.apellido === null || contacto.apellido === undefined ||
          contacto.nombre === null || contacto.nombre === undefined ||
          contacto.correo === null || contacto.correo === undefined ||
          contacto.telefono === null || contacto.telefono === undefined
        ){
          throw new Error("CSV Enviado no fue valido");          
        }

        let skipInputs = ['nombre','apellido','correo','telefono','id']

        let preContacto: Contacto = {
          nombre: contacto.nombre,
          apellido: contacto.apellido,
          correo: contacto.correo,
          telefono:contacto.telefono,
          extraValues:[]
        }

        for (const contactoMap of Object.entries(contacto)) {
          if(skipInputs.includes(contactoMap[0])) continue;

          preContacto.extraValues!.push({
            label:contactoMap[0],
            value:contactoMap[1]
          })
        }

        return preContacto

      })

      console.log(parsedContactos)
    })
  }

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
        this.http.post('https://csv-parser-api.onrender.com/export',parsedContactos,{
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
