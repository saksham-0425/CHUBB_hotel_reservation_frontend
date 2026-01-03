import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAvailability } from './hotel-availability';

describe('HotelAvailability', () => {
  let component: HotelAvailability;
  let fixture: ComponentFixture<HotelAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelAvailability]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelAvailability);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
