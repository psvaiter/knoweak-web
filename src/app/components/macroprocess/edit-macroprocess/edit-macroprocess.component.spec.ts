import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMacroprocessComponent } from './edit-macroprocess.component';

describe('EditMacroprocessComponent', () => {
  let component: EditMacroprocessComponent;
  let fixture: ComponentFixture<EditMacroprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMacroprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMacroprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
