import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormControl, FormGroup } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';

type InputElementType = 'text' | 'number' | 'email' | 'tel'

@Component({
  selector: 'app-arr-input',
  template: `
    <ng-container [formGroup]="formGroup">
      <div [formArrayName]="formArrayName" class="flex flex-col items-center space-y-2">
        <div class="flex flex-row text-lg space-x-4 items-center">
            <input
                [type]="type"
                [id]="inputName"
                class="p-1 rounded-md border border-gray-500"
                [formControlName]="inputName"
                [placeholder]="placeholder">
        </div>
        <span
            [InputError]="esValido()"
            [mensaje]="getErrorMsg()"
            class="text-red-600"
        ></span>
      </div>
    </ng-container>    
  `,
  styles: [
  ]
})
export class ArrInputComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @Input() formArrayName!: string;
  @Input() inputName!: number;
  @Input() placeholder: string = '';
  @Input() type: InputElementType = 'text';

  control!: FormControl;

  constructor(private validatorService: ValidatorService) { }

  ngOnInit() {
    this.control = <FormControl>this.formGroup.get([this.formArrayName,this.inputName])
  }

  esValido(): boolean | null {
    return (this.control.errors && this.control.touched)
  }
  
  getErrorMsg(): string | null{
    return this.validatorService.getErrorsMSG(this.control.errors)
  }


}

