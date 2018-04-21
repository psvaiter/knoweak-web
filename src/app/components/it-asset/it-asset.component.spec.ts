import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItAssetComponent } from './it-asset.component';

describe('ItAssetComponent', () => {
  let component: ItAssetComponent;
  let fixture: ComponentFixture<ItAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
