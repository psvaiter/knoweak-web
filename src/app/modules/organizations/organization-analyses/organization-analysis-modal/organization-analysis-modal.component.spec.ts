import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAnalysisModalComponent } from './organization-analysis-modal.component';

describe('OrganizationAnalysisModalComponent', () => {
  let component: OrganizationAnalysisModalComponent;
  let fixture: ComponentFixture<OrganizationAnalysisModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationAnalysisModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationAnalysisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
