import { Injectable } from '@angular/core';
import { Contacto } from '../interfaces/contacto.interface';
import {db} from 'src/app/db'
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  add(){}

  getLiveQuery(){
    return liveQuery(()=>db.contactos.toArray())
  }

}
