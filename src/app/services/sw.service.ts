import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwService {

  constructor(public updates: SwUpdate) {
  }

  public checkForUpdates(): void {
    if(!this.updates.isEnabled) return
    this.updates.checkForUpdate()
    .then(res=>{
      if(res){
        this.updates.versionUpdates.subscribe(event => this.promptUser());
      }
    })
  }

  private promptUser(): void {
    console.log('updating to new version');
    this.updates.activateUpdate().then(() => document.location.reload()); 
  }
  
}
