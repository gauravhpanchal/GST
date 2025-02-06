import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGSTAppComponent } from './create-gstapp.component';

describe('CreateGSTAppComponent', () => {
  let component: CreateGSTAppComponent;
  let fixture: ComponentFixture<CreateGSTAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGSTAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGSTAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
