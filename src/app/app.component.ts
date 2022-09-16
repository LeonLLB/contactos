import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { SwService } from './services/sw.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    private swService: SwService,
  ){
    //Actualizar cada 12 horas
    interval(6 * 1000 * 60 * 10 * 12).subscribe(()=>{
      this.swService.checkForUpdates()
    })
  }

}
