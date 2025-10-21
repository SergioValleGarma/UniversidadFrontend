import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Facultad, CreateFacultad, UpdateFacultad } from '../../../models/facultad.model';
import { UniversidadService } from '../../../services/universidad.service';

@Component({
  selector: 'app-facultades-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './facultades-form.html',
  styleUrls: ['./facultades-form.css']
})
export class FacultadesFormComponent implements OnInit {
  nombre: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  decano: string = '';
  formSubmitted: boolean = false;
  
  esEdicion: boolean = false;
  facultadId?: number;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private universidadService: UniversidadService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.esEdicion = true;
        this.facultadId = +params['id'];
        this.cargarFacultad(this.facultadId);
      }
    });
  }

  cargarFacultad(id: number): void {
    this.loading = true;
    this.universidadService.getFacultad(id).subscribe({
      next: (facultad) => {
        this.nombre = facultad.nombre;
        this.descripcion = facultad.descripcion || '';
        this.ubicacion = facultad.ubicacion || '';
        this.decano = facultad.decano || '';
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar la facultad: ' + error.message;
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    
    if (!this.nombre.trim()) {
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.esEdicion && this.facultadId) {
      this.actualizarFacultad();
    } else {
      this.crearFacultad();
    }
  }

  crearFacultad(): void {
    const nuevaFacultad: CreateFacultad = {
      nombre: this.nombre,
      descripcion: this.descripcion || undefined,
      ubicacion: this.ubicacion || undefined,
      decano: this.decano || undefined
    };
    
    this.universidadService.createFacultad(nuevaFacultad).subscribe({
      next: (facultad) => {
        this.loading = false;
        alert('Facultad creada correctamente');
        this.router.navigate(['/facultades']);
      },
      error: (error) => {
        this.error = 'Error al crear la facultad: ' + error.message;
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  actualizarFacultad(): void {
    if (!this.facultadId) return;

    const facultadActualizada: UpdateFacultad = {
      descripcion: this.descripcion || undefined,
      ubicacion: this.ubicacion || undefined,
      decano: this.decano || undefined
    };
    
    this.universidadService.updateFacultad(this.facultadId, facultadActualizada).subscribe({
      next: () => {
        this.loading = false;
        alert('Facultad actualizada correctamente');
        this.router.navigate(['/facultades']);
      },
      error: (error) => {
        this.error = 'Error al actualizar la facultad: ' + error.message;
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }
}