import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAnalysisDetailComponent } from './organization-analysis-detail.component';

describe('OrganizationAnalysisDetailComponent', () => {
  let component: OrganizationAnalysisDetailComponent;
  let fixture: ComponentFixture<OrganizationAnalysisDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationAnalysisDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationAnalysisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
