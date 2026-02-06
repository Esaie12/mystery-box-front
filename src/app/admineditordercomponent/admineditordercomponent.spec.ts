import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditOrderComponent } from './admineditordercomponent';

describe('Admineditordercomponent', () => {
  let component: AdminEditOrderComponent;
  let fixture: ComponentFixture<AdminEditOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditOrderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
