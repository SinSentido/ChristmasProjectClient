import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//servicios
import { ApiService } from '../services/api/api.service';

//dto
import { Libro } from '../dto/LibroDto';
import { Categoria } from '../dto/CategoriaDto';
import { Comentario } from '../dto/ComentarioDto';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  id: string;
  cargandoLibro = true;
  libro: Libro = new Libro();
  paginaComentarios: number = 1;
  isUltimaPaginaComentarios = false;
  comentarios: Comentario[] = [];
  categorias: Categoria[] = [];

  constructor(private activeRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(res => {
      this.id = res.id;
      this.getLibroInfo();
    });
  }

  getLibroInfo(){
    this.apiService.getLibroById(this.id).subscribe(res => {
      this.libro.id = res.id;
      this.libro.titulo = res.titulo;
      this.libro.autor = res.autor;
      this.libro.imagen = res.imagen;
      this.libro.descripcion = res.descripcion;

      this.categorias = res.categorias;

      this.mostrarPaginaComentarios();
    });
  }

  mostrarPaginaComentarios(){
    this.apiService.getComentariosByLibro(this.paginaComentarios, this.libro.id).subscribe(res =>{
      console.log(res);
      res['hydra:member'].forEach(c => {
        var comentario = new Comentario();
        console.log(c);
        comentario.comentario = c.comentario;
        comentario.usuario.nombre = c.usuario.nombre;
        comentario.usuario.apellidos = c.usuario.apellidos;
        comentario.usuario.id = c.usuario.id;

        this.comentarios.push(comentario);

        this.paginaComentarios++;
      });
    });
  }

}
