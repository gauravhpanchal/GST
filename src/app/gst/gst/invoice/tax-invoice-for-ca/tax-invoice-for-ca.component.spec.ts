import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxInvoiceForCAComponent } from './tax-invoice-for-ca.component';

describe('TaxInvoiceForCAComponent', () => {
  let component: TaxInvoiceForCAComponent;
  let fixture: ComponentFixture<TaxInvoiceForCAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxInvoiceForCAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxInvoiceForCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
