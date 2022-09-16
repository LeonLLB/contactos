import { Directive, ElementRef, Input } from '@angular/core';
import { turnCharIntoColor } from 'src/app/helpers/turnCharIntoColor';
import { Contacto } from 'src/app/interfaces/contacto.interface';

@Directive({
  selector: '[CustomContactColor]'
})
export class CustomContactColorDirective {

  private _contact!: Contacto

  @Input('CustomContactColor') set CustomContactColor(contacto: Contacto){
    this._contact = contacto
    this.setColor()
  }  

  constructor(
    private htmlElement: ElementRef<HTMLElement>,
  ) { }  

  ngOnInit(): void {
    this.setColor()    
  }

  setColor(){
    const nombreSplit = this._contact.nombre.split('')
    const apellidoSplit = this._contact.apellido.split('')

    const color = `#FF${
      turnCharIntoColor(nombreSplit[0])
    }${
      turnCharIntoColor(nombreSplit[1])
    }${
      turnCharIntoColor(apellidoSplit[0])
    }${
      turnCharIntoColor(apellidoSplit[1])
    }`.toLocaleUpperCase()
    
    this.htmlElement.nativeElement.style.backgroundColor = color
  }

}
