import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthropometryabwComponent } from './anthropometryabw.component';

describe('AnthropometryabwComponent', () => {
  let component: AnthropometryabwComponent;
  let fixture: ComponentFixture<AnthropometryabwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnthropometryabwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnthropometryabwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
