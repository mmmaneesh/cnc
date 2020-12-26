import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginboxedComponent } from './loginboxed.component';

describe('LoginboxedComponent', () => {
  let component: LoginboxedComponent;
  let fixture: ComponentFixture<LoginboxedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginboxedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginboxedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
