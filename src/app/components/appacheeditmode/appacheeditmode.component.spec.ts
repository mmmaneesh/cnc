import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppacheeditmodeComponent } from './appacheeditmode.component';

describe('AppacheeditmodeComponent', () => {
  let component: AppacheeditmodeComponent;
  let fixture: ComponentFixture<AppacheeditmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppacheeditmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppacheeditmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
