export interface Facultad {
  facultadId: number;
  nombre: string;
  descripcion?: string;
  ubicacion?: string;
  decano?: string;
  fechaRegistro: Date;
}

export interface CreateFacultad {
  nombre: string;
  descripcion?: string;
  ubicacion?: string;
  decano?: string;
}

export interface UpdateFacultad {
  descripcion?: string;
  ubicacion?: string;
  decano?: string;
}