import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPgComponent } from './plan-pg.component';

describe('PlanPgComponent', () => {
  let component: PlanPgComponent;
  let fixture: ComponentFixture<PlanPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
