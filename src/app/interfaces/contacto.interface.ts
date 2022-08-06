import * as PouchDB from 'pouchdb'

export interface Contacto extends PouchDB.Core.AllDocsMeta, PouchDB.Core.IdMeta, PouchDB.Core.GetMeta {
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