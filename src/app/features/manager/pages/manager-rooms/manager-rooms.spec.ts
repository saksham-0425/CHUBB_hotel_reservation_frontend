import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRoomsComponent } from './manager-rooms';

describe('ManagerRoomsComponent', () => {
  let component: ManagerRoomsComponent;
  let fixture: ComponentFixture<ManagerRoomsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRoomsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
