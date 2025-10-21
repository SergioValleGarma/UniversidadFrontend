import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadesForm } from './facultades-form';

describe('FacultadesForm', () => {
  let component: FacultadesForm;
  let fixture: ComponentFixture<FacultadesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultadesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultadesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
