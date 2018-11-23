import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSecurityThreatLookupComponent } from './organization-security-threat-lookup.component';

describe('OrganizationSecurityThreatLookupComponent', () => {
  let component: OrganizationSecurityThreatLookupComponent;
  let fixture: ComponentFixture<OrganizationSecurityThreatLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationSecurityThreatLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSecurityThreatLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
