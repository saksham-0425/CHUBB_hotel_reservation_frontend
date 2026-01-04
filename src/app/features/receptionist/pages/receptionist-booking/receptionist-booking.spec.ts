import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistBooking } from './receptionist-booking';

describe('ReceptionistBooking', () => {
  let component: ReceptionistBooking;
  let fixture: ComponentFixture<ReceptionistBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistBooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
