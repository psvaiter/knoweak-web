import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAnalysisScopeSelectionComponent } from './organization-analysis-scope-selection.component';

describe('OrganizationAnalysisScopeSelectionComponent', () => {
  let component: OrganizationAnalysisScopeSelectionComponent;
  let fixture: ComponentFixture<OrganizationAnalysisScopeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationAnalysisScopeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationAnalysisScopeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
