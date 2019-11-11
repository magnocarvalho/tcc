import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoginComponent } from './create-login.component';

describe('CreateLoginComponent', () => {
  let component: CreateLoginComponent;
  let fixture: ComponentFixture<CreateLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
