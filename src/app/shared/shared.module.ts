import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputErrorDirective } from './directives/input-error.directive';
import { InputComponent } from './input/input.component';
import { ArrInputComponent } from './arr-input/arr-input.component';



@NgModule({
  declarations: [
    InputErrorDirective,
    InputComponent,
    ArrInputComponent
  ],
  imports:[
    ReactiveFormsModule,
    CommonModule
  ],
  exports:[
    InputErrorDirective,
    InputComponent,
    ArrInputComponent
  ]
})
export class SharedModule { }
