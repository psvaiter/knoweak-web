import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroprocessLookupModalComponent } from './macroprocess-lookup-modal.component';

describe('MacroprocessLookupModalComponent', () => {
  let component: MacroprocessLookupModalComponent;
  let fixture: ComponentFixture<MacroprocessLookupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroprocessLookupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroprocessLookupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
