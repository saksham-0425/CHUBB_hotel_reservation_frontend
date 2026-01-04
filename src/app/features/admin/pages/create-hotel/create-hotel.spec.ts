import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHotelComponent } from './create-hotel';

describe('CreateHotel', () => {
  let component: CreateHotelComponent;
  let fixture: ComponentFixture<CreateHotelComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHotelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
