import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpointsComponent } from './addpoints.component';

describe('AddpointsComponent', () => {
  let component: AddpointsComponent;
  let fixture: ComponentFixture<AddpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
