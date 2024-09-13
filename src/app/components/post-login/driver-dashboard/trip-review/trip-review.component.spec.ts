import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripReviewComponent } from './trip-review.component';

describe('TripReviewComponent', () => {
  let component: TripReviewComponent;
  let fixture: ComponentFixture<TripReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripReviewComponent]
    });
    fixture = TestBed.createComponent(TripReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
