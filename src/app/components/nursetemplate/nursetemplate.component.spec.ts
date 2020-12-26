import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NursetemplateComponent } from './nursetemplate.component';

describe('NursetemplateComponent', () => {
  let component: NursetemplateComponent;
  let fixture: ComponentFixture<NursetemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NursetemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NursetemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
