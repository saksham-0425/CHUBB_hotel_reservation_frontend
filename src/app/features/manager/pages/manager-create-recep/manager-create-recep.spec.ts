import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerReceptionistComponent } from './manager-create-recep';

describe('ManagerCreateRecep', () => {
  let component: ManagerReceptionistComponent;
  let fixture: ComponentFixture<ManagerReceptionistComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerReceptionistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerReceptionistComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
