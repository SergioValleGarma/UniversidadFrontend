import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Carrera } from '../../../models/carrera.model';
import { UniversidadService } from '../../../services/universidad.service';

@Component({
  selector: 'app-carreras-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carreras-list.html',
  styleUrls: ['./carreras-list.css']
})
export class CarrerasListComponent implements OnInit {
  carreras: Carrera[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private universidadService: UniversidadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarCarreras();
  }

  cargarCarreras(): void {
    this.loading = true;
    this.error = '';

    this.universidadService.getCarreras().subscribe({
      next: (data) => {
        this.carreras = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las carreras: ' + error.message;
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  eliminarCarrera(id: number, nombre: string): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la carrera "${nombre}"?`)) {
      this.universidadService.deleteCarrera(id).subscribe({
        next: () => {
          this.carreras = this.carreras.filter(c => c.carreraId !== id);
          alert('Carrera eliminada correctamente');
        },
        error: (error) => {
          alert('Error al eliminar la carrera: ' + error.message);
          console.error('Error:', error);
        }
      });
    }
  }
}