import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnsMovComponent } from './btns-mov.component';

describe('BtnsMovComponent', () => {
  let component: BtnsMovComponent;
  let fixture: ComponentFixture<BtnsMovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnsMovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnsMovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
