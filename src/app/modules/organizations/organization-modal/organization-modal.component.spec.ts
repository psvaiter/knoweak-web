import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationModalComponent } from './organization-modal.component';

describe('OrganizationModalComponent', () => {
  let component: OrganizationModalComponent;
  let fixture: ComponentFixture<OrganizationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
