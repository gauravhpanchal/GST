import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APOBComponent } from './apob.component';

describe('APOBComponent', () => {
  let component: APOBComponent;
  let fixture: ComponentFixture<APOBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APOBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APOBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
