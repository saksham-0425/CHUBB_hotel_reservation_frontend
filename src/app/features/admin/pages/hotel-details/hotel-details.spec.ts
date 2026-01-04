import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailsComponent } from './hotel-details';

describe('HotelDetailsComponent', () => {
  let component: HotelDetailsComponent;
  let fixture: ComponentFixture<HotelDetailsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
