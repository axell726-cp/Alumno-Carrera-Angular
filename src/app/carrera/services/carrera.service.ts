import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Carrera } from '../models/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private ApiURl = "http://localhost:8080/api/carreras";

  constructor(private http: HttpClient) { }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.ApiURl);
  }
  getCarrerabyID(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.ApiURl}/${id}`);
  }
  updateCarrera(id: number, carrera: Carrera): Observable<Carrera> {
    return this.http.put<Carrera>(`${this.ApiURl}/${id}`, carrera);
  }
  deleteCarrera(id: number): Observable<Carrera> {
    return this.http.delete<Carrera>(`${this.ApiURl}/${id}`);
  }
  crearCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.ApiURl, carrera);
  }

  getCarrerasActivas(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.ApiURl).pipe(
      map(carrera => carrera.filter(c => c.estado === '1'))
    );
  }
}
