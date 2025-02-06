import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppApobItemComponent } from './app-apob-item.component';

describe('AppApobItemComponent', () => {
  let component: AppApobItemComponent;
  let fixture: ComponentFixture<AppApobItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppApobItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppApobItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
