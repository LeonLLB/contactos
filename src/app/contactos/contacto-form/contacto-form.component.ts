import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdditionalValues } from 'src/app/interfaces/contacto.interface';
import { DBService } from 'src/app/services/db.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-contacto-form',
  templateUrl: './contacto-form.component.html',
  styles: [
  ]
})
export class ContactoFormComponent implements OnInit {

  contactoForm: FormGroup = this.fb.group({
    nombre:['',[Validators.required,this.validatorService.notNumeric]],
    apellido:['',[Validators.required,this.validatorService.notNumeric]],
    cedula:[null,[Validators.required,Validators.min(1),this.validatorService.maxNumericLength(9,true),this.validatorService.numeric]],
    correo: ['',Validators.email],
    telefono: [null,[Validators.min(1),this.validatorService.minNumericLength(10),this.validatorService.numeric]],
    extraValues: this.fb.array<AdditionalValues>([])
  })

  extraValue:FormGroup = this.fb.group({
    label:[''],
    value:['']
  })

  get rawValues(){
    return Object.entries(this.contactoForm.controls)
  }

  get getAdditionalValues(){
    return this.contactoForm.get('extraValues') as FormArray
  }

  addAditionalValue(){
    if (this.extraValue.invalid) return;

    this.getAdditionalValues.push(this.fb.control(this.extraValue.value))

    this.extraValue.reset()
  }

  esValido(campo: string) {
    return (this.contactoForm.controls[campo].errors && this.contactoForm.controls[campo].touched)
  }
  
  getErrorMsg(campo: string): string | null{
    return this.validatorService.getErrorsMSG(this.contactoForm.controls[campo].errors)
  }

  deleteAdditionalValue(index:number){
    this.getAdditionalValues.removeAt(index)
  }

  formSubmit(){
    if(this.contactoForm.invalid){
      this.contactoForm.markAllAsTouched()
      return;
    }

    console.log(this.contactoForm.value)
  }

  constructor(private validatorService: ValidatorService, private dbService: DBService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
