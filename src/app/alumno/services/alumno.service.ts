import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private ApiURl = "http://localhost:8080/api/alumnos";

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.ApiURl);
  }

  getAlumnoByID(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.ApiURl}/${id}`);
  }
  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.ApiURl}/${id}`, alumno);
  }
  deleteAlumno(id: number): Observable<Alumno> {
    return this.http.delete<Alumno>(`${this.ApiURl}/${id}`);
  }

  crearAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.ApiURl, alumno);
  }
}
