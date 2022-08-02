import { Component, OnInit } from '@angular/core';
import { Page } from './services/navigation.interface';
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

  changePage(page: Page){
    this.navService.setPage(page); 

    this.page = this.navService.actualPage
  }

}
