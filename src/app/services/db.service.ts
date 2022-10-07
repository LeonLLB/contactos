import { Injectable } from '@angular/core';
import {db} from 'src/app/db'
import { liveQuery } from 'dexie';
import { Contacto } from '../interfaces/contacto.interface';
import { NotifyService } from './notify.service';
import { LoadingService } from './loading.service';
import { ConfirmService } from './confirm.service';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(
    private notify: NotifyService,
    private loading: LoadingService,
    private confirm: ConfirmService
  ){}
  
  getLiveQuery(){
    return liveQuery(()=>db.contactos.toArray())
  }
  
  addContacto(contacto: Contacto): Promise<boolean>{
    this.loading.displayLoading('Creando...')
    return db.contactos.add(contacto)
    .then(data=>data)
    .then(()=>{this.loading.hideLoading();this.notify.success('Contacto creado!');return true})
  }

  getContacto(id: number): Promise<Contacto>{
    return db.contactos.get(+id)
    .then(data=>data as Contacto)
  }

  updateContacto(id:number,contacto:Contacto): Promise<boolean>{
    this.loading.displayLoading('Creando...')
    return db.contactos.update(+id,contacto)
    .then(data=>{this.loading.hideLoading();this.notify.success('Contacto actualizado!');return data===1})
  }

  async deleteContacto(id:number): Promise<void>{
    this.confirm.warning({
      title:'Eliminar contacto',
      message:'Estas seguro de querer eliminar a este contacto? esta acción es irreversible!',
      okText:'Eliminar',
      onOk:async()=>{
        await db.contactos.delete(+id)
        this.notify.success('Contacto eliminado con exito')
      }
    })
  }

  queryContactoByNombreOrApellido(query: string): Promise<Contacto[]>{
    const collection = db.contactos.filter((contacto)=>{
      const condition = new RegExp(query.toLowerCase())
      return condition.test(contacto.nombre.toLowerCase()) || condition.test(contacto.apellido.toLowerCase())
    })

    return collection.toArray()
  }

  restore(dbRestore: Contacto[]): Promise<number>{
    return new Promise(async (resolve)=>{

      const data = await db.contactos.filter(()=>true).toArray()
      await db.contactos.bulkDelete(data.map(val=>val.id!))
      const keys = await db.contactos.bulkAdd(dbRestore,undefined,{allKeys:true})
      resolve(keys)

      // this.getLiveQuery()
      // .subscribe(async(data)=>{
      //   const ids: number[] = data.map((val)=>val.id!)
      // })
    })
  }

}
