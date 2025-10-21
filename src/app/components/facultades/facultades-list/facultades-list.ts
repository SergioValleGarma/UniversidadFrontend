import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Facultad } from '../../../models/facultad.model';
import { UniversidadService } from '../../../services/universidad.service';

@Component({
  selector: 'app-facultades-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './facultades-list.html',
  styleUrls: ['./facultades-list.css']
})
export class FacultadesListComponent implements OnInit {
  facultades: Facultad[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private universidadService: UniversidadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarFacultades();
  }

  cargarFacultades(): void {
    this.loading = true;
    this.error = '';

    this.universidadService.getFacultades().subscribe({
      next: (data) => {
        this.facultades = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las facultades: ' + error.message;
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  eliminarFacultad(id: number, nombre: string): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la facultad "${nombre}"?`)) {
      this.universidadService.deleteFacultad(id).subscribe({
        next: () => {
          this.facultades = this.facultades.filter(f => f.facultadId !== id);
          alert('Facultad eliminada correctamente');
        },
        error: (error) => {
          alert('Error al eliminar la facultad: ' + error.message);
          console.error('Error:', error);
        }
      });
    }
  }

  navegarAFormulario(): void {
    this.router.navigate(['/facultades/nueva']);
  }
}