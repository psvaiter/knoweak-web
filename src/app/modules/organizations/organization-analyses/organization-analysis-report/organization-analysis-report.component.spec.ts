import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAnalysisReportComponent } from './organization-analysis-report.component';

describe('OrganizationAnalysisReportComponent', () => {
  let component: OrganizationAnalysisReportComponent;
  let fixture: ComponentFixture<OrganizationAnalysisReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationAnalysisReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationAnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
