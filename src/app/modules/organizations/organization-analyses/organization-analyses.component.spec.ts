import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAnalysesComponent } from './organization-analyses.component';

describe('OrganizationAnalysesComponent', () => {
  let component: OrganizationAnalysesComponent;
  let fixture: ComponentFixture<OrganizationAnalysesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationAnalysesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationAnalysesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
