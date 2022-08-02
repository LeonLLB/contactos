import { Component, OnInit } from '@angular/core';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  
  page = ''

  constructor(private navService: NavigationService){
  }
  
  ngOnInit() {
    this.page = this.navService.actualPage
  }

  changePage(){
    if(this.page === 'csv') this.navService.setPage('contactos'); 
    else this.navService.setPage('csv');

    this.page = this.navService.actualPage
  }

}
