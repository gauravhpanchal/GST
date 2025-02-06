import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxInvoiceForOtherComponent } from './tax-invoice-for-other.component';

describe('TaxInvoiceForOtherComponent', () => {
  let component: TaxInvoiceForOtherComponent;
  let fixture: ComponentFixture<TaxInvoiceForOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxInvoiceForOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxInvoiceForOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
