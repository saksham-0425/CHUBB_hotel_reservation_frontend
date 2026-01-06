import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsComponent } from './hotels';

describe('HotelsComponent', () => {
  let component: HotelsComponent;
  let fixture: ComponentFixture<HotelsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
