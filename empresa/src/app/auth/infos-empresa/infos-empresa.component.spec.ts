import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosEmpresaComponent } from './infos-empresa.component';

describe('InfosEmpresaComponent', () => {
  let component: InfosEmpresaComponent;
  let fixture: ComponentFixture<InfosEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
