import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowOrder } from './admin-show-order';

describe('AdminShowOrder', () => {
  let component: AdminShowOrder;
  let fixture: ComponentFixture<AdminShowOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminShowOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShowOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
