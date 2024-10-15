import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  usuarioGuardado = JSON.parse(localStorage.getItem('usuario')!);

  info = ''
  data = {
    sex: 'Seleccione su sexo',
    date_birthday: '',
    name: '',
    last_name: '',
    email: '',
    addres: '',
    country: 'Seleccione su País',
    Deparment: 'Seleccione su departamento',
    City: 'Seleccione su Ciudad',
    comment: '',
  }





  constructor(private http: HttpClient, private router: Router) {
  }
  ngOnInit() {
    let dataSource = [];
    if (this.router.routerState.snapshot.root.queryParams['id']) {
      this.http.get<any>('https://cincoveinticinco.com/users.json')
        .pipe(
          map((response) => {
            return response.users
          })
        )
        .subscribe(res => {
          dataSource = res;
          this.usuarioGuardado.id = dataSource.length + 1
          dataSource = [...dataSource, this.usuarioGuardado]
          console.log(this.router.routerState.snapshot.root.queryParams['id']);

          this.data =  dataSource.find(persona => persona.id == this.router.routerState.snapshot.root.queryParams['id'])
            

        })

    }
  }
  validInputs() {

    if (this.data.sex === 'Seleccione su sexo' || this.data.sex === '' || this.data.date_birthday == '' || this.data.date_birthday == null ||
      this.data.name == '' || this.data.name == null || this.data.last_name == '' || this.data.last_name == null || this.data.email == '' || this.data.email == null ||
      this.data.addres == '' || this.data.addres == null || this.data.country == 'Seleccione su País' || this.data.country == null || this.data.City == 'Seleccione su Ciudad' ||
      this.data.City == null || this.data.comment == '' || this.data.comment == null
    ) {
      return false
    } else if (this.data.country == 'Colombia' && (this.data.Deparment == 'Seleccione su departamento' || this.data.Deparment == '')) {
      return false
    } else {
      return true
    }
  }

  onSubmit() {
    const hoy = new Date()
    const fechaNacimiento = new Date(this.data.date_birthday);
    if (hoy.getTime() - fechaNacimiento.getTime() <= 18 * 365.25 * 24 * 60 * 60 * 1000) {
      alert('Debes ser mayor de edad para registrarte')
      return
    }
    if (this.validInputs()) {
      localStorage.setItem('usuario', JSON.stringify(this.data));
      this.router.navigate(['/data'])
    } else {
      alert('Faltan datos por completar')
    }
  }

}