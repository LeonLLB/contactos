import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalValues, Contacto } from 'src/app/interfaces/contacto.interface';
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
    correo: ['',Validators.email],
    telefono: [null,[Validators.min(1),this.validatorService.minNumericLength(10),this.validatorService.numeric]],
    extraLabels: this.fb.array<string>([]),
    extraValues: this.fb.array<string>([])
  })

  extraValue: FormControl = this.fb.control('')
  extraLabel: FormControl = this.fb.control('')

  isEditableForm = false
  contactoId!: number

  constructor(
    private validatorService: ValidatorService,
    private dbService: DBService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const rawLabels = localStorage.getItem('labels')
    if(!rawLabels) return

    const labels: string[] = JSON.parse(rawLabels)

    this.route.params
    .subscribe(params=>{
      if(params['id']){
        this.isEditableForm = true
        this.contactoId = +params['id']

        this.dbService.getContacto(this.contactoId)
        .then(contacto=>{
          if(!contacto) {this.router.navigate(['/contactos']);return;}
          let newForm: {[x:string]:any} = {}
          const ignoreInputs = ['id']

          for( let contactoMap of Object.entries(contacto)){
            if(ignoreInputs.includes(contactoMap[0])) continue;
            if(contactoMap[0] === 'extraValues'){
              newForm['extraValues'] = []
              newForm['extraLabels'] = []
              for(let value of contactoMap[1]){
                this.extraLabel.setValue(value.label);
                this.extraValue.setValue(value.value);
                this.addAditionalValue();
                
                (newForm['extraValues'] as any[]).push(value.value);
                (newForm['extraLabels'] as any[]).push(value.label);
              }
              continue
            }
            newForm[contactoMap[0]] = contactoMap[1]
          }

          this.contactoForm.setValue(newForm)
        })
      }else{
        for(let label of labels){
          this.extraLabel.setValue(label)
          this.addAditionalValue()
        }
      }
    })

    
  }

  get rawValues(){
    return Object.entries(this.contactoForm.controls)
  }

  get getAdditionalValues(){
    return this.getLabelOrValueFromForm('value')
  }

  get getAdditionalLabels(){
    return this.getLabelOrValueFromForm('label')
  }

  getLabelOrValueFromForm(type: 'value' | 'label'): FormArray{
    if(type === 'value') return this.contactoForm.get('extraValues') as FormArray
    return this.contactoForm.get('extraLabels') as FormArray
  }

  addAditionalValue(){
    if (this.extraValue.invalid || this.extraLabel.invalid) return;

    this.getAdditionalValues.push(this.fb.control(this.extraValue.value))
    this.getAdditionalLabels.push(this.fb.control(this.extraLabel.value))

    this.extraValue.reset()
    this.extraLabel.reset()
  }

  deleteInputFromArr(index:number){
    this.getAdditionalValues.removeAt(index)
    this.getAdditionalLabels.removeAt(index)
  }

  formSubmit(){
    if(this.contactoForm.invalid){
      this.contactoForm.markAllAsTouched()
      return;
    }

    if(this.getAdditionalLabels.length > 0) localStorage.setItem('labels',JSON.stringify(this.getAdditionalLabels.value))

    const newContacto: Contacto = {
      nombre: this.contactoForm.value.nombre,
      apellido: this.contactoForm.value.apellido,
      telefono: this.contactoForm.value.telefono,
      correo: this.contactoForm.value.correo,
      extraValues: (this.contactoForm.value.extraLabels as []).map((label,i)=>{
        return {
          label,
          value:this.contactoForm.value.extraValues[i],
        }
      })
    }

    if(!this.isEditableForm){
      this.dbService.addContacto(newContacto)
      .then(result=>{
        if(result){
          this.router.navigate(['contactos'])
        }
      })
      return    
    }
    this.dbService.updateContacto(this.contactoId,newContacto)
    .then(result=>{
      if(result){
        this.router.navigate(['contactos',this.contactoId])
      }
    })

  }

}
