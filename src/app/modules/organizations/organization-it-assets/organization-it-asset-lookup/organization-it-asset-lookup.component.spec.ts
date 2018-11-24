import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationItAssetLookupComponent } from './organization-it-asset-lookup.component';

describe('OrganizationItAssetLookupComponent', () => {
  let component: OrganizationItAssetLookupComponent;
  let fixture: ComponentFixture<OrganizationItAssetLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationItAssetLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationItAssetLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
