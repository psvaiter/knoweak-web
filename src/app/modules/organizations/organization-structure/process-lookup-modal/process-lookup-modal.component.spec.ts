import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessLookupModalComponent } from './process-lookup-modal.component';

describe('ProcessLookupModalComponent', () => {
  let component: ProcessLookupModalComponent;
  let fixture: ComponentFixture<ProcessLookupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessLookupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessLookupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
