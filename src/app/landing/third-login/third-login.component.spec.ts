import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdLoginComponent } from './third-login.component';

describe('ThirdLoginComponent', () => {
  let component: ThirdLoginComponent;
  let fixture: ComponentFixture<ThirdLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
