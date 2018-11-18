import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItServiceItemComponent } from './it-service-item.component';

describe('ItServiceItemComponent', () => {
  let component: ItServiceItemComponent;
  let fixture: ComponentFixture<ItServiceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItServiceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItServiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
