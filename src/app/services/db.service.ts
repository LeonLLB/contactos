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

}
