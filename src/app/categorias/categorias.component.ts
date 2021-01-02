import { Component, OnInit } from '@angular/core';

//services
import { ApiService } from '../services/api/api.service';

//dto
import { Categoria } from '../dto/CategoriaDto';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.apiService.getCategorias().subscribe(res => {
      res['hydra:member'].forEach(cat => {
        var categoria = new Categoria();

        categoria.id = cat.id;
        categoria.nombre = cat.nombre;
        categoria.descripcion = cat.descripcion;

        this.categorias.push(categoria);
      });
    });
  }



}
