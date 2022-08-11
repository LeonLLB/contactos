
export interface AdditionalValues {
    label:string,
    value:string
}

export interface Contacto{
    id?:number,
    nombre:string,
    apellido:string,
    cedula:number,
    correo?: string,
    telefono?: number,
    extraValues?: AdditionalValues[]
}