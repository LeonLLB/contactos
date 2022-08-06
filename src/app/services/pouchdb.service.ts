import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb'
import { Contacto } from '../interfaces/contacto.interface';

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {

  db: PouchDB.Database<Contacto>

  constructor() { 
    this.db = new PouchDB('contactos')
   }

  getAll(): Promise<Contacto[] | void[]> {
    return this.db.allDocs<Contacto>({include_docs:true})
    .then(data=>data.rows)
    .then(data=>{
      const info = data.map(contacto =>{
        contacto.doc
      })
      return info
    })
  }

  getOne(id:string): Promise<Contacto | null> {
    return this.db.get<Contacto>(id)
  }

  update(contactoNew: Contacto): Promise<boolean> {
    return this.db.get<Contacto>(contactoNew._id)
    .then(data=>{
      return this.db.put({
        ...contactoNew,
        _id:contactoNew._id,
        _rev:data._rev
      })
    })
    .then(()=>true)
    .catch((e)=>{console.log(e);return false})
  }

  delete(id:string): Promise<boolean> {
    return this.db.get<Contacto>(id)
    .then(data=>{
      return this.db.remove(data)
    })
    .then(()=>true)
    .catch((e)=>{console.log(e);return false})
  }
}
