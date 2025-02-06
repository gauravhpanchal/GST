import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPgComponent } from './upload-pg.component';

describe('UploadPgComponent', () => {
  let component: UploadPgComponent;
  let fixture: ComponentFixture<UploadPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
