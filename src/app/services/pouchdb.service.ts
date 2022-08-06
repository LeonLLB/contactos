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
}
