import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistAvailability } from './receptionist-availability';

describe('ReceptionistAvailability', () => {
  let component: ReceptionistAvailability;
  let fixture: ComponentFixture<ReceptionistAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistAvailability]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistAvailability);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
