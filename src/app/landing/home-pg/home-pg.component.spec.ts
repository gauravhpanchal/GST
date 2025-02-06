import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePgComponent } from './home-pg.component';

describe('HomePgComponent', () => {
  let component: HomePgComponent;
  let fixture: ComponentFixture<HomePgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
