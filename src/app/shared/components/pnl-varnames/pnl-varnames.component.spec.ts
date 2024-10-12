import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnlVarnamesComponent } from './pnl-varnames.component';

describe('PnlVarnamesComponent', () => {
  let component: PnlVarnamesComponent;
  let fixture: ComponentFixture<PnlVarnamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnlVarnamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnlVarnamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
