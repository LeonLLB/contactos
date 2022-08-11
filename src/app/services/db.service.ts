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
    .then(data=>console.log(data))
    .then(()=>true)
  }

  updateContacto(contacto:Contacto): Promise<boolean>{
    return db.contactos.update(contacto.id!,contacto)
    .then(data=>data===1)
  }

  deleteContacto(id:number): Promise<void>{
    return db.contactos.delete(id)
  }

}
