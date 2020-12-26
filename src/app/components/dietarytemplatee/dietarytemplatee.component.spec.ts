import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietarytemplateeComponent } from './dietarytemplatee.component';

describe('DietarytemplateeComponent', () => {
  let component: DietarytemplateeComponent;
  let fixture: ComponentFixture<DietarytemplateeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietarytemplateeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietarytemplateeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
