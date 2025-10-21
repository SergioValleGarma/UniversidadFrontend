import { Facultad } from './facultad.model';

export interface Carrera {
  carreraId: number;
  facultadId: number;
  nombre: string;
  descripcion?: string;
  duracionSemestres: number;
  tituloOtorgado?: string;
  fechaRegistro: Date;
  facultad?: Facultad;
}

export interface CreateCarrera {
  facultadId: number;
  nombre: string;
  descripcion?: string;
  duracionSemestres: number;
  tituloOtorgado?: string;
}

export interface UpdateCarrera {
  descripcion?: string;
  duracionSemestres?: number;
  tituloOtorgado?: string;
}