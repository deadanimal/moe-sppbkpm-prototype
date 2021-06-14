import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TahunTingkatanPageViewComponent } from './tahun-tingkatan-page-view.component';

describe('TahunTingkatanPageViewComponent', () => {
  let component: TahunTingkatanPageViewComponent;
  let fixture: ComponentFixture<TahunTingkatanPageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahunTingkatanPageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahunTingkatanPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
