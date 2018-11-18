import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItAssetLookupModalComponent } from './it-asset-lookup-modal.component';

describe('ItAssetLookupModalComponent', () => {
  let component: ItAssetLookupModalComponent;
  let fixture: ComponentFixture<ItAssetLookupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItAssetLookupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItAssetLookupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
