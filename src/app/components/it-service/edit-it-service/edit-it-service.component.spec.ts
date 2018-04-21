import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItServiceComponent } from './edit-it-service.component';

describe('EditItServiceComponent', () => {
  let component: EditItServiceComponent;
  let fixture: ComponentFixture<EditItServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditItServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
