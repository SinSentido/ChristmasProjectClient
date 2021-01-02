import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const API_BASE_URL: string = "https://localhost:8000/api";
const BASE_URL: string = "https://localhost:8000";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient) { }

  //Consulta lista libros paginado
  getLibros(pagina: number): Observable<any>{
    return this.httpClient.get(API_BASE_URL + '/libros?page=' + pagina, {
      observe: 'body'
    });
  }

  //Consulta libro por id
  getLibroById(id): Observable<any>{
    return this.httpClient.get(API_BASE_URL + '/libros/' + id, {
      observe: 'body'
    });
  }

  //Consulta comentario por id
  getComentariosByLibro(pagina, idlibro): Observable<any>{
    return this.httpClient.get(API_BASE_URL + '/comentarios?page=' + pagina + '&libro=' + idlibro, {
      observe: 'body'
    })
  }

  //Consulta lista de categorias
  getCategorias(): Observable<any>{
    return this.httpClient.get(API_BASE_URL + '/categorias', {
      observe: 'body'
    })
  }

  //Consultar usuario por url
  getUsuarioByUrl(url): Observable<any>{
    return this.httpClient.get(BASE_URL + url, {
      observe: 'body'
    });
  }
}
