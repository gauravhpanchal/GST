import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestyListComponent } from './testy-list.component';

describe('TestyListComponent', () => {
  let component: TestyListComponent;
  let fixture: ComponentFixture<TestyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
