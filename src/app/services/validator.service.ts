import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

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
            max: length
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
            min: length
          }
        }
      }
      return null
    }
  }
}
