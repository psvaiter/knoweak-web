import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMitigationControlComponent } from './edit-mitigation-control.component';

describe('EditMitigationControlComponent', () => {
  let component: EditMitigationControlComponent;
  let fixture: ComponentFixture<EditMitigationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMitigationControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMitigationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
