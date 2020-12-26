import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SofascoreeleoneComponent } from './sofascoreeleone.component';

describe('SofascoreeleoneComponent', () => {
  let component: SofascoreeleoneComponent;
  let fixture: ComponentFixture<SofascoreeleoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SofascoreeleoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SofascoreeleoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
