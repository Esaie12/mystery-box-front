import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductShow } from './admin-product-show';

describe('AdminProductShow', () => {
  let component: AdminProductShow;
  let fixture: ComponentFixture<AdminProductShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductShow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
