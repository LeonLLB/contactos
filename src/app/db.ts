import Dexie, {Table} from 'dexie'
import { Contacto } from './interfaces/contacto.interface'

export class ContactoDB extends Dexie{
    contactos!: Table<Contacto,number>

    constructor(){
        super('ngdexieliveQuery')
        this.version(3).stores({
            contactos: '++id'
        })
        this.on('populate',()=>this.populate())
    }

    async populate() {        
        await db.contactos.bulkAdd([
          {
            nombre:'Leonard Alejandro',
            apellido:'Velásquez Pinto',
            cedula:28724030,
            correo: 'leonard.avp@gmail.com',
            telefono: 4147722057,
          },
          {
            nombre:'Yajaira Mercedes',
            apellido:'Pinto Rodriguez',
            cedula:11213492,
            correo: 'yajairampr@gmail.com',
            telefono: 4243543468,
          },
          {
            nombre:'Leonardo Habacuc',
            apellido:'Velásquez Parra',
            cedula:13456987,
            correo: 'leonard.hvp@gmail.com',
            telefono:412589674,
          },
        ]);
      }
}

export const db = new ContactoDB()