import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SofaanalysisComponent } from './sofaanalysis.component';

describe('SofaanalysisComponent', () => {
  let component: SofaanalysisComponent;
  let fixture: ComponentFixture<SofaanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SofaanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SofaanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
