import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateListComponent } from './cate-list.component';

describe('CateListComponent', () => {
  let component: CateListComponent;
  let fixture: ComponentFixture<CateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
