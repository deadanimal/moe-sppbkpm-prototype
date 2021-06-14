import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeputusanComponent } from './keputusan.component';

describe('KeputusanComponent', () => {
  let component: KeputusanComponent;
  let fixture: ComponentFixture<KeputusanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeputusanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeputusanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
