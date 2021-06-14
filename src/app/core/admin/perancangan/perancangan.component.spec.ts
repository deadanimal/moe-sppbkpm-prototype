import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerancanganComponent } from './perancangan.component';

describe('PerancanganComponent', () => {
  let component: PerancanganComponent;
  let fixture: ComponentFixture<PerancanganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerancanganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerancanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
