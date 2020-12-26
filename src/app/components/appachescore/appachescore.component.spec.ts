import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppachescoreComponent } from './appachescore.component';

describe('AppachescoreComponent', () => {
  let component: AppachescoreComponent;
  let fixture: ComponentFixture<AppachescoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppachescoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppachescoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
