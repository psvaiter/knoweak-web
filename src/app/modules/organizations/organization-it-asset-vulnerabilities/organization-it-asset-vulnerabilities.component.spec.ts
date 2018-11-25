import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationItAssetVulnerabilitiesComponent } from './organization-it-asset-vulnerabilities.component';

describe('OrganizationItAssetVulnerabilitiesComponent', () => {
  let component: OrganizationItAssetVulnerabilitiesComponent;
  let fixture: ComponentFixture<OrganizationItAssetVulnerabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationItAssetVulnerabilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationItAssetVulnerabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
