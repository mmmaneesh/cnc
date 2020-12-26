import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerloginComponent } from './innerlogin.component';

describe('InnerloginComponent', () => {
  let component: InnerloginComponent;
  let fixture: ComponentFixture<InnerloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
