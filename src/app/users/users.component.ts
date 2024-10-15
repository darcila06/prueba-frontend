import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

export interface UserData {
  id: number,
  sex: string,
  date_birthday: string,
  name: string,
  last_name: string,
  email: string,
  addres: string,
  country: string,
  Deparment: string,
  City: string,
  comment: string
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatFormFieldModule, FontAwesomeModule, CdkDropList, CdkDrag, MatInputModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'last_name', 'country', 'actions'];
  dataSource!: UserData[];
  originalDataSource!: UserData[];
  usuarioGuardado = JSON.parse(localStorage.getItem('usuario')!);
  faPenToSquare = faPenToSquare;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.http.get<any>('https://cincoveinticinco.com/users.json')
      .pipe(
        map((response) => {
          return response.users
        })
      )
      .subscribe(res => {
        this.dataSource = res;
        this.usuarioGuardado.id = this.dataSource.length + 1
        this.dataSource.push(this.usuarioGuardado)
        this.originalDataSource = [...this.dataSource];
      })
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) {
      this.dataSource = [...this.originalDataSource]; // Creamos una copia de la lista original
      return;
    }
    const personasEncontradas = this.originalDataSource.filter(persona => {

      const personaMinuscula = JSON.stringify(persona).toLowerCase();

      const textoMinuscula = filterValue.toLowerCase();
      return personaMinuscula.includes(textoMinuscula)
    });
    this.dataSource = personasEncontradas

  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  onEdit(id: number) {
    this.router.navigate(['/contact'], {
      queryParams: { id: id }
    })

  }
}
