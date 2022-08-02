import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Page } from 'src/app/services/navigation.interface';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{

  page= ''

  @Output() onChangePage: EventEmitter<Page> = new EventEmitter()

  constructor(private navService: NavigationService){
  }

  ngOnInit() {
    this.page = this.navService.actualPage
  }

  changePage(page: Page){
    this.navService.setPage(page); 

    this.onChangePage.emit(page)
    this.page = this.navService.actualPage
  }
  
}
