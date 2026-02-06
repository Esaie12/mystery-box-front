import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserShow } from './admin-user-show';

describe('AdminUserShow', () => {
  let component: AdminUserShow;
  let fixture: ComponentFixture<AdminUserShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserShow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
