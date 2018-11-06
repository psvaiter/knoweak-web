import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsLookupModalComponent } from './departments-lookup-modal.component';

describe('DepartmentsLookupModalComponent', () => {
  let component: DepartmentsLookupModalComponent;
  let fixture: ComponentFixture<DepartmentsLookupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentsLookupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsLookupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
