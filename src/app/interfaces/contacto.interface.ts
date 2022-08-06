import * as PouchDB from 'pouchdb'

export interface Contacto extends PouchDB.Core.AllDocsMeta {
    id?:number,
    nombre:string,
    apellido:string,
    cedula:number,
    correo?: string,
    telefono?: number,
    sueldo?: number,
    NroHijo?: number,
    NroBanco?:string,
    FechaIngreso?:Date
}