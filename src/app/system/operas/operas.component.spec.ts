import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperasComponent } from './operas.component';

describe('OperasComponent', () => {
  let component: OperasComponent;
  let fixture: ComponentFixture<OperasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
