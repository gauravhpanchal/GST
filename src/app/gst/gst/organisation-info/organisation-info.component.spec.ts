import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationInfoComponent } from './organisation-info.component';

describe('OrganisationInfoComponent', () => {
  let component: OrganisationInfoComponent;
  let fixture: ComponentFixture<OrganisationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
