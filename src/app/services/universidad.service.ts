import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facultad, CreateFacultad, UpdateFacultad } from '../models/facultad.model';
import { Carrera, CreateCarrera, UpdateCarrera } from '../models/carrera.model';

@Injectable({
  providedIn: 'root'
})
export class UniversidadService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Facultades
  getFacultades(): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(`${this.apiUrl}/facultades`);
  }

  getFacultad(id: number): Observable<Facultad> {
    return this.http.get<Facultad>(`${this.apiUrl}/facultades/${id}`);
  }

  createFacultad(facultad: CreateFacultad): Observable<Facultad> {
    return this.http.post<Facultad>(`${this.apiUrl}/facultades`, facultad);
  }

  updateFacultad(id: number, facultad: UpdateFacultad): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/facultades/${id}`, facultad);
  }

  deleteFacultad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/facultades/${id}`);
  }

  // Carreras
  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.apiUrl}/carreras`);
  }

  getCarrera(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.apiUrl}/carreras/${id}`);
  }

  getCarrerasByFacultad(facultadId: number): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.apiUrl}/carreras/facultad/${facultadId}`);
  }

  createCarrera(carrera: CreateCarrera): Observable<Carrera> {
    return this.http.post<Carrera>(`${this.apiUrl}/carreras`, carrera);
  }

  updateCarrera(id: number, carrera: UpdateCarrera): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/carreras/${id}`, carrera);
  }

  deleteCarrera(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/carreras/${id}`);
  }
}