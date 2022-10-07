
export interface AdditionalValues {
    label:string,
    value:string
}

export interface ContactoCore{
    nombre:string,
    apellido:string,
    correo?: string,
    telefono?: number,
}

export interface ContactoFromCSV extends ContactoCore {
    [x:string]:any,
}

export interface Contacto extends ContactoCore{
    id?:number,    
    extraValues?: AdditionalValues[]
}