import { Injectable } from '@angular/core';
import { DBService } from 'src/app/services/db.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {saveAs} from 'file-saver'
import { Contacto, ContactoFromCSV } from 'src/app/interfaces/contacto.interface';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { catchError, of } from 'rxjs';

@Injectable()
export class CsvService {

  constructor(
    private db: DBService,
    private http: HttpClient,
    private loading: LoadingService,
    private notify: NotifyService,
    private confirm: ConfirmService
  ) { }

  private importCsv(csv:File){
    this.loading.displayLoading('Importando contactos...')
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

      this.db.restore(parsedContactos)
      .then((keys)=>{
        this.loading.hideLoading()
        this.notify.success(`${(keys as unknown as any[]).length} contactos restaurados`)
      })
    })
  }

  import(csv: File){
    this.confirm.warning({
      title:'Importar contactos',
      message:'Al importar los contactos de este archivo, se eliminaran todos los contactos actuales, estas seguro de querer continuar?',
      okText:'Importar',
      onOk:()=>this.importCsv(csv)
    })
  }

  export(){
    this.loading.displayLoading('Exportando contactos...')
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
          }
          contactoParseado['nombre'] = contacto.nombre
          contactoParseado['apellido'] = contacto.apellido
          contactoParseado['telefono'] = (contacto.telefono === null) ? '' : contacto.telefono
          contactoParseado['correo'] = (contacto.correo === null) ? '' : contacto.correo
          return contactoParseado
        })
        parsedContactos = parsedContactos.sort((a,b) => a['id']>b['id'] ? 1 : -1)
        this.http.post('https://csv-parser-api.onrender.com/export',parsedContactos,{
          responseType:'blob',
        })
        .pipe(
          catchError((err)=>{
            this.loading.hideLoading()
            this.notify.failure('Hubo un error al generar el archivo csv')
            console.log(err)
            return of(null)
          })
        )
        .subscribe(data=>{
          if(data){
            this.loading.hideLoading()
            this.notify.success('CSV generado!')
            console.log(data)
            saveAs(data,`${new Date().getTime()}-contactos-backup.csv`)
          }
        })
      }
    })
  }

}
