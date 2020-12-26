import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoremeterComponent } from './scoremeter.component';

describe('ScoremeterComponent', () => {
  let component: ScoremeterComponent;
  let fixture: ComponentFixture<ScoremeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoremeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoremeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
