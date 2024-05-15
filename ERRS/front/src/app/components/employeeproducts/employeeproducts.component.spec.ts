import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeproductsComponent } from './employeeproducts.component';

describe('EmployeeproductsComponent', () => {
  let component: EmployeeproductsComponent;
  let fixture: ComponentFixture<EmployeeproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeproductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
