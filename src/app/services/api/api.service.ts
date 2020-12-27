import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const BASE_URL: string = "https://localhost:8000/api";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getLibros(pagina: number): Observable<any>{
    return this.httpClient.get(BASE_URL + '/libros?page=' + pagina, {
      observe: 'body'
    });
  }
}
