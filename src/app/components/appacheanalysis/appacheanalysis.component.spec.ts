import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppacheanalysisComponent } from './appacheanalysis.component';

describe('AppacheanalysisComponent', () => {
  let component: AppacheanalysisComponent;
  let fixture: ComponentFixture<AppacheanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppacheanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppacheanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
