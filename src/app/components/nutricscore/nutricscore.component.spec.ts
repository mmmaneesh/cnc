import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricscoreComponent } from './nutricscore.component';

describe('NutricscoreComponent', () => {
  let component: NutricscoreComponent;
  let fixture: ComponentFixture<NutricscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
