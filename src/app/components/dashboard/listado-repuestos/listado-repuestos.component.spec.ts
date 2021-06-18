import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRepuestosComponent } from './listado-repuestos.component';

describe('ListadoRepuestosComponent', () => {
  let component: ListadoRepuestosComponent;
  let fixture: ComponentFixture<ListadoRepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoRepuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
