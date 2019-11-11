import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromoComponent } from './new-promo.component';

describe('NewPromoComponent', () => {
  let component: NewPromoComponent;
  let fixture: ComponentFixture<NewPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
