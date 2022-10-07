import { Injectable } from '@angular/core';
import { Loading } from 'notiflix/build/notiflix-loading-aio'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  displayLoading(message: string){
    Loading.circle(message,{svgColor:'#78b5ff',messageColor:'#78b5ff'})
  }

  hideLoading(){
    Loading.remove()
  }

  constructor() { }
}
