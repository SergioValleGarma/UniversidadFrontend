import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasForm } from './carreras-form';

describe('CarrerasForm', () => {
  let component: CarrerasForm;
  let fixture: ComponentFixture<CarrerasForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerasForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrerasForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
