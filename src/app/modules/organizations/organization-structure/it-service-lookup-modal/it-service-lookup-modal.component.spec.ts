import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItServiceLookupModalComponent } from './it-service-lookup-modal.component';

describe('ItServiceLookupModalComponent', () => {
  let component: ItServiceLookupModalComponent;
  let fixture: ComponentFixture<ItServiceLookupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItServiceLookupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItServiceLookupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
