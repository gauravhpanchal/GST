import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualInfoComponent } from './individual-info.component';

describe('IndividualInfoComponent', () => {
  let component: IndividualInfoComponent;
  let fixture: ComponentFixture<IndividualInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
