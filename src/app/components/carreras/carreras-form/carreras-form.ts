import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Carrera } from '../../../models/carrera.model';
import { Facultad } from '../../../models/facultad.model';
import { UniversidadService } from '../../../services/universidad.service';

@Component({
  selector: 'app-carreras-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carreras-form.html',
  styleUrls: ['./carreras-form.css']
})
export class CarrerasFormComponent implements OnInit {
  carrera: Carrera = {
    carreraId: 0,
    nombre: '',
    duracionSemestres: 0,
    tituloOtorgado: '',
    facultadId: 0,
    fechaRegistro: new Date(),
    facultad: undefined
  };

  facultades: Facultad[] = [];
  loading: boolean = false;
  isEdit: boolean = false;
  error: string = '';

  constructor(
    private universidadService: UniversidadService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarFacultades();
    
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.cargarCarrera(Number(id));
    }
  }

  cargarFacultades(): void {
    this.universidadService.getFacultades().subscribe({
      next: (data) => {
        this.facultades = data;
      },
      error: (error) => {
        this.error = 'Error al cargar las facultades: ' + error.message;
        console.error('Error:', error);
      }
    });
  }

  cargarCarrera(id: number): void {
    this.loading = true;
    this.universidadService.getCarrera(id).subscribe({
      next: (data) => {
        this.carrera = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar la carrera: ' + error.message;
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  guardarCarrera(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.isEdit) {
      this.universidadService.updateCarrera(this.carrera.carreraId, this.carrera).subscribe({
        next: () => {
          this.loading = false;
          alert('Carrera actualizada correctamente');
          this.router.navigate(['/carreras']);
        },
        error: (error) => {
          this.error = 'Error al actualizar la carrera: ' + error.message;
          this.loading = false;
          console.error('Error:', error);
        }
      });
    } else {
      this.universidadService.createCarrera(this.carrera).subscribe({
        next: () => {
          this.loading = false;
          alert('Carrera creada correctamente');
          this.router.navigate(['/carreras']);
        },
        error: (error) => {
          this.error = 'Error al crear la carrera: ' + error.message;
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  validarFormulario(): boolean {
    if (!this.carrera.nombre || this.carrera.nombre.trim() === '') {
      this.error = 'El nombre de la carrera es requerido';
      return false;
    }

    if (!this.carrera.facultadId || this.carrera.facultadId === 0) {
      this.error = 'Debe seleccionar una facultad';
      return false;
    }

    if (!this.carrera.duracionSemestres || this.carrera.duracionSemestres <= 0) {
      this.error = 'La duración en semestres debe ser mayor a 0';
      return false;
    }

    if (!this.carrera.tituloOtorgado || this.carrera.tituloOtorgado.trim() === '') {
      this.error = 'El título otorgado es requerido';
      return false;
    }

    return true;
  }

  cancelar(): void {
    this.router.navigate(['/carreras']);
  }
}