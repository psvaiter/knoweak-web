import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroprocessesLookupModalComponent } from './macroprocesses-lookup-modal.component';

describe('MacroprocessesLookupModalComponent', () => {
  let component: MacroprocessesLookupModalComponent;
  let fixture: ComponentFixture<MacroprocessesLookupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroprocessesLookupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroprocessesLookupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
