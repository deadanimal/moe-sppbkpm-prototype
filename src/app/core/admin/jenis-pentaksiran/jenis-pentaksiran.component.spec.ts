import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JenisPentaksiranComponent } from './jenis-pentaksiran.component';

describe('JenisPentaksiranComponent', () => {
  let component: JenisPentaksiranComponent;
  let fixture: ComponentFixture<JenisPentaksiranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JenisPentaksiranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JenisPentaksiranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
