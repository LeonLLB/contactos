import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputErrorDirective } from './directives/input-error.directive';
import { InputComponent } from './input/input.component';
import { ArrInputComponent } from './arr-input/arr-input.component';
import { CustomContactColorDirective } from './directives/custom-contact-color.directive';



@NgModule({
  declarations: [
    InputErrorDirective,
    InputComponent,
    ArrInputComponent,
    CustomContactColorDirective
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule
  ],
  exports:[
    InputErrorDirective,
    CustomContactColorDirective,
    InputComponent,
    ArrInputComponent
  ]
})
export class SharedModule { }
