import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistDashboardComponent } from './receptionist-dashboard';

describe('ReceptionistDashboard', () => {
  let component: ReceptionistDashboardComponent;
  let fixture: ComponentFixture<ReceptionistDashboardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionistDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
