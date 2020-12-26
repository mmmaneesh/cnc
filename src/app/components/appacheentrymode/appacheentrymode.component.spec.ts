import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppacheentrymodeComponent } from './appacheentrymode.component';

describe('AppacheentrymodeComponent', () => {
  let component: AppacheentrymodeComponent;
  let fixture: ComponentFixture<AppacheentrymodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppacheentrymodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppacheentrymodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
