import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteincalorieformComponent } from './proteincalorieform.component';

describe('ProteincalorieformComponent', () => {
  let component: ProteincalorieformComponent;
  let fixture: ComponentFixture<ProteincalorieformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteincalorieformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteincalorieformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
