import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[InputError]'
})
export class InputErrorDirective implements OnInit{

  private _msg: string = ''

  @Input('mensaje') set mensaje(msg: string | null){
    this._msg = msg || ''
    this.setMsg()
  }

  constructor(
    private htmlElement: ElementRef<HTMLElement>,
  ) { }

  ngOnInit(): void {
    this.setMsg()
  }

  setMsg(){
    this.htmlElement.nativeElement.innerText = this._msg
  }

}
