import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityThreatComponent } from './security-threat.component';

describe('SecurityThreatComponent', () => {
  let component: SecurityThreatComponent;
  let fixture: ComponentFixture<SecurityThreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityThreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityThreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
