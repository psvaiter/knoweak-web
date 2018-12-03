import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSecurityThreatsComponent } from './organization-security-threats.component';

describe('OrganizationSecurityThreatsComponent', () => {
  let component: OrganizationSecurityThreatsComponent;
  let fixture: ComponentFixture<OrganizationSecurityThreatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationSecurityThreatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSecurityThreatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
