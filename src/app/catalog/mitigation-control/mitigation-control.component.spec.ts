import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitigationControlComponent } from './mitigation-control.component';

describe('MitigationControlComponent', () => {
  let component: MitigationControlComponent;
  let fixture: ComponentFixture<MitigationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitigationControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitigationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
