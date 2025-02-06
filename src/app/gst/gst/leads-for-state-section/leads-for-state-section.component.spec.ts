import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsForStateSectionComponent } from './leads-for-state-section.component';

describe('LeadsForStateSectionComponent', () => {
  let component: LeadsForStateSectionComponent;
  let fixture: ComponentFixture<LeadsForStateSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsForStateSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsForStateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
