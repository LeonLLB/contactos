import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  getErrorsMSG(errors: ValidationErrors | null): string | null{
    if(errors){
      // required
      if(errors['required']){
        return '* Este campo es obligatorio'
      }
      if(errors['notNumeric']){
        return '* Este campo no acepta números'
      }
      if(errors['email']){
        return '* Este campo no es un correo valido'
      }
      if(errors['numeric']){
        return '* Se esperaba un valor númerico'
      }
      if(errors['min']){
        return `* Se esperaba un valor mayor a ${errors['min']['min'] - 1} pero se obtuvo ${errors['min']['actual']}`
      }
      if(errors['minNumericLength']){
        return `* Se esperaba más de ${errors['minNumericLength']['min'] -1} caracteres pero se obtuvieron ${errors['minNumericLength']['actual']}`
      }
      if(errors['max']){
        return `* Se esperaba un valor menor a ${errors['max']['max']+1} pero se obtuvo ${errors['max']['actual']}`
      }
      if(errors['maxNumericLength']){
        return `* Se esperaba menos de ${errors['maxNumericLength']['max'] +1} caracteres pero se obtuvieron ${errors['maxNumericLength']['actual']}`
      }
    }
    return null
  }

  numeric(control : FormControl): ValidationErrors | null {
    const value = control.value
    if(isNaN(value)){
      return {
        numeric: true
      }
    }
    return null
  }

  notNumeric(control : FormControl): ValidationErrors | null {
    const value = control.value
    if(!isNaN(value)){
      return {
        notNumeric: true
      }
    }
    return null
  }

  minNumericLength(length: number,isRequired:boolean = false): (control:FormControl<number>)=>ValidationErrors| null{
    return (control) => {
      if(!isRequired && (control.value === null ) ) return null
      const value = control.value?.toString()
      if(length > value.length){
        return {
          minNumericLength:{
            actual: value.length,
            min: length
          }
        }
      }
      return null
    }
  }

  maxNumericLength(length: number,isRequired:boolean = false): (control:FormControl<number>)=>ValidationErrors| null{
    return (control) => {
      if(!isRequired && (control.value === null ) ) return null
      const value = control.value?.toString()
      if(length < value?.length){
        return {
          maxNumericLength:{
            actual: value.length,
            max: length
          }
        }
      }
      return null
    }
  }
}
