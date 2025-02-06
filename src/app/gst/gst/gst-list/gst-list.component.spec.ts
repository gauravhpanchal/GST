import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstListComponent } from './gst-list.component';

describe('GstListComponent', () => {
  let component: GstListComponent;
  let fixture: ComponentFixture<GstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
