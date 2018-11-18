import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItAssetItemComponent } from './it-asset-item.component';

describe('ItAssetItemComponent', () => {
  let component: ItAssetItemComponent;
  let fixture: ComponentFixture<ItAssetItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItAssetItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItAssetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
