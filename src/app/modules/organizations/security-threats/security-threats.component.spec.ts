import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityThreatsComponent } from './security-threats.component';

describe('SecurityThreatsComponent', () => {
  let component: SecurityThreatsComponent;
  let fixture: ComponentFixture<SecurityThreatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityThreatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityThreatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
