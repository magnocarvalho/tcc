import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPromoComponent } from './editar-promo.component';

describe('EditarPromoComponent', () => {
  let component: EditarPromoComponent;
  let fixture: ComponentFixture<EditarPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
