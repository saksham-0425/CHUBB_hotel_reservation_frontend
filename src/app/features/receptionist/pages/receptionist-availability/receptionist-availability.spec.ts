import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistAvailabilityComponent } from './receptionist-availability';

describe('ReceptionistAvailability', () => {
  let component: ReceptionistAvailabilityComponent;
  let fixture: ComponentFixture<ReceptionistAvailabilityComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistAvailabilityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
