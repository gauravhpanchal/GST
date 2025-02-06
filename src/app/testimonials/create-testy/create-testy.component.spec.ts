import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestyComponent } from './create-testy.component';

describe('CreateTestyComponent', () => {
  let component: CreateTestyComponent;
  let fixture: ComponentFixture<CreateTestyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTestyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
