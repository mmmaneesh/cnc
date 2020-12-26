import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcombinationComponent } from './productcombination.component';

describe('ProductcombinationComponent', () => {
  let component: ProductcombinationComponent;
  let fixture: ComponentFixture<ProductcombinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcombinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
