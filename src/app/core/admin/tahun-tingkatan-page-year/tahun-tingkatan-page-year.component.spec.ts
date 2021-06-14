import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahunTingkatanPageYearComponent } from './tahun-tingkatan-page-year.component';

describe('TahunTingkatanPageYearComponent', () => {
  let component: TahunTingkatanPageYearComponent;
  let fixture: ComponentFixture<TahunTingkatanPageYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahunTingkatanPageYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahunTingkatanPageYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
