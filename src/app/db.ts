import Dexie, {Table} from 'dexie'
import { Contacto } from './interfaces/contacto.interface'

export class ContactoDB extends Dexie{
    contactos!: Table<Contacto,number>

    constructor(){
        super('ngdexieliveQuery')
        this.version(3).stores({
            contactos: '++id'
        })
    }
}

export const db = new ContactoDB()