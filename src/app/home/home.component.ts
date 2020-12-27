import { Component, OnInit } from '@angular/core';

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
  libros: Libro[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getLibros(this.siguientePagina);
  }

  private getLibros(siguientePagina: number) {
    this.apiService.getLibros(siguientePagina).subscribe(data => {
      console.log(data);
      this.librosToList(data["hydra:member"]);

      //Se comprueba la siguiente página
      this.setPaginaSiguiente(data["hydra:view"]["hydra:last"]);

    }, error => {
      console.log(error);
    });
  }

  private setPaginaSiguiente(ultimaPagina: number){
    if(this.siguientePagina < ultimaPagina){
      this.siguientePagina++;
    }
    else{
      this.ultimaPagina = true;
    }
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
