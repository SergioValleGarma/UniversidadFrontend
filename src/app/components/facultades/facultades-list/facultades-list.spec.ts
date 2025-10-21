import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadesList } from './facultades-list';

describe('FacultadesList', () => {
  let component: FacultadesList;
  let fixture: ComponentFixture<FacultadesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultadesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultadesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
