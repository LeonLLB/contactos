import { Injectable } from '@angular/core';
import {db} from 'src/app/db'
import { liveQuery } from 'dexie';
import { Contacto } from '../interfaces/contacto.interface';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  
  getLiveQuery(){
    return liveQuery(()=>db.contactos.toArray())
  }
  
  addContacto(contacto: Contacto): Promise<boolean>{
    return db.contactos.add(contacto)
    .then(data=>data)
    .then(()=>true)
  }

  getContacto(id: number): Promise<Contacto>{
    return db.contactos.get(+id)
    .then(data=>data as Contacto)
  }

  updateContacto(id:number,contacto:Contacto): Promise<boolean>{
    return db.contactos.update(+id,contacto)
    .then(data=>data===1)
  }

  deleteContacto(id:number): Promise<void>{
    return db.contactos.delete(+id)
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
