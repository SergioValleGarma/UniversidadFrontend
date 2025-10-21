import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/facultades', pathMatch: 'full' },
  { 
    path: 'facultades', 
    loadComponent: () => import('./components/facultades/facultades-list/facultades-list').then(m => m.FacultadesListComponent)
  },
  { 
    path: 'facultades/nueva', 
    loadComponent: () => import('./components/facultades/facultades-form/facultades-form').then(m => m.FacultadesFormComponent)
  },
  { 
    path: 'facultades/editar/:id', 
    loadComponent: () => import('./components/facultades/facultades-form/facultades-form').then(m => m.FacultadesFormComponent)
  },
  // NUEVAS RUTAS PARA CARRERAS
  { 
    path: 'carreras', 
    loadComponent: () => import('./components/carreras/carreras-list/carreras-list').then(m => m.CarrerasListComponent)
  },
  { 
    path: 'carreras/nueva', 
    loadComponent: () => import('./components/carreras/carreras-form/carreras-form').then(m => m.CarrerasFormComponent)
  },
  { 
    path: 'carreras/editar/:id', 
    loadComponent: () => import('./components/carreras/carreras-form/carreras-form').then(m => m.CarrerasFormComponent)
  }
];