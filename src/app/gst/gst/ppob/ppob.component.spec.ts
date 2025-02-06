import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PPOBComponent } from './ppob.component';

describe('PPOBComponent', () => {
  let component: PPOBComponent;
  let fixture: ComponentFixture<PPOBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPOBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPOBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
