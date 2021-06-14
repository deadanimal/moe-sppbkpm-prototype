import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahunTingkatanComponent } from './tahun-tingkatan.component';

describe('TahunTingkatanComponent', () => {
  let component: TahunTingkatanComponent;
  let fixture: ComponentFixture<TahunTingkatanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahunTingkatanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahunTingkatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
