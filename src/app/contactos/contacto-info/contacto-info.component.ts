import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from 'src/app/interfaces/contacto.interface';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-contacto-info',
  templateUrl: './contacto-info.component.html',
  styles: [
  ]
})
export class ContactoInfoComponent implements OnInit {

  contactoId!: number
  contacto!: Contacto
  isLoading = true

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DBService
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(data=>{
      this.contactoId = data['id']

      this.db.getContacto(this.contactoId)
      .then(contacto => {
        if(contacto){
          this.contacto = contacto
          this.isLoading = false  
          return
        }
        this.router.navigate(['/contactos'])
      })
    })
  }

  deleteContacto(){
    this.db.deleteContacto(this.contactoId)
    .then(_=>{
      this.router.navigate(['/contactos'])
    })
  }

}
