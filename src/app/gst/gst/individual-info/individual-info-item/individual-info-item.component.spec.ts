import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualInfoItemComponent } from './individual-info-item.component';

describe('IndividualInfoItemComponent', () => {
  let component: IndividualInfoItemComponent;
  let fixture: ComponentFixture<IndividualInfoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualInfoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
