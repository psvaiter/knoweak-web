import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroprocessComponent } from './macroprocess.component';

describe('MacroprocessComponent', () => {
  let component: MacroprocessComponent;
  let fixture: ComponentFixture<MacroprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
