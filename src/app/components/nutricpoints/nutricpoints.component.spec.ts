import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricpointsComponent } from './nutricpoints.component';

describe('NutricpointsComponent', () => {
  let component: NutricpointsComponent;
  let fixture: ComponentFixture<NutricpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
