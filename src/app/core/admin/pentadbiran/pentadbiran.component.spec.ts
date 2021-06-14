import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PentadbiranComponent } from './pentadbiran.component';

describe('PentadbiranComponent', () => {
  let component: PentadbiranComponent;
  let fixture: ComponentFixture<PentadbiranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PentadbiranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PentadbiranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
