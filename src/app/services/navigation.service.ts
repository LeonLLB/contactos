import { Injectable } from '@angular/core';

type Page = 'csv' | 'contactos'

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private _actualPage: Page = 'contactos'

  get actualPage() {
    const page = this._actualPage
    return page
  }

  setPage(page: Page){
    this._actualPage = page
  }

  constructor() { }
}
