import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//services
import { ApiService } from '../services/api/api.service';

//dto
import { Libro } from '../dto/LibroDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  siguientePagina: number = 1;
  ultimaPagina: boolean = false;
  cargando: boolean = true;
  libros: Libro[] = [];
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros() {
    this.cargando = true;
    console.log(this.siguientePagina);
    this.apiService.getLibros(this.siguientePagina).subscribe(data => {
      console.log(data);
      this.librosToList(data["hydra:member"]);

      if(data['hydra:view']['@id'] == data['hydra:view']['hydra:last']){
        this.ultimaPagina = true;
      }
      this.siguientePagina += 1;
      this.cargando = false;  
    }, error => {
      console.log(error);
    });
  }

  navigateToLibro(idlibro: number){
    this.router.navigateByUrl('/libros/' + idlibro);
  }

  private librosToList(masLibros: any[]){
    masLibros.forEach(libro => {
      var l: Libro = new Libro();
  
      l.id = libro.id;
      l.titulo = libro.titulo;
      l.autor = libro.autor;
      l.categorias = libro.categorias;
      l.comentarios = libro.comentarios;
  
      this.libros.push(l);
    });
  }

}
