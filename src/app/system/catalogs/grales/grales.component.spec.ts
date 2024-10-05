import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GralesComponent } from './grales.component';

describe('GralesComponent', () => {
  let component: GralesComponent;
  let fixture: ComponentFixture<GralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
