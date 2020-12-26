import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SofascoreeletwoComponent } from './sofascoreeletwo.component';

describe('SofascoreeletwoComponent', () => {
  let component: SofascoreeletwoComponent;
  let fixture: ComponentFixture<SofascoreeletwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SofascoreeletwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SofascoreeletwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
