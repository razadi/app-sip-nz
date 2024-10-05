import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigilantComponent } from './vigilant.component';

describe('VigilantComponent', () => {
  let component: VigilantComponent;
  let fixture: ComponentFixture<VigilantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigilantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigilantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
