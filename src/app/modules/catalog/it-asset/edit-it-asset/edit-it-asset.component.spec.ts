import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItAssetComponent } from './edit-it-asset.component';

describe('EditItAssetComponent', () => {
  let component: EditItAssetComponent;
  let fixture: ComponentFixture<EditItAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditItAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
