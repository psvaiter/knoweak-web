import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroprocessItemComponent } from './macroprocess-item.component';

describe('MacroprocessItemComponent', () => {
  let component: MacroprocessItemComponent;
  let fixture: ComponentFixture<MacroprocessItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroprocessItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroprocessItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
