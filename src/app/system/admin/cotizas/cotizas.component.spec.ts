import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizasComponent } from './cotizas.component';

describe('CotizasComponent', () => {
  let component: CotizasComponent;
  let fixture: ComponentFixture<CotizasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
