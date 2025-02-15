import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddachievementsComponent } from './addachievements.component';

describe('AddachievementsComponent', () => {
  let component: AddachievementsComponent;
  let fixture: ComponentFixture<AddachievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddachievementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddachievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
