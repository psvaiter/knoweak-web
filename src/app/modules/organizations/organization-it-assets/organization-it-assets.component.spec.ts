import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationItAssetsComponent } from './organization-it-assets.component';

describe('OrganizationItAssetsComponent', () => {
  let component: OrganizationItAssetsComponent;
  let fixture: ComponentFixture<OrganizationItAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationItAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationItAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
