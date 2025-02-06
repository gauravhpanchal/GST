import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPgComponent } from './contact-pg.component';

describe('ContactPgComponent', () => {
  let component: ContactPgComponent;
  let fixture: ComponentFixture<ContactPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
