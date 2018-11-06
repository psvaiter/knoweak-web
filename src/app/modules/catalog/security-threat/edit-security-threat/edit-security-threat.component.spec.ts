import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecurityThreatComponent } from './edit-security-threat.component';

describe('EditSecurityThreatComponent', () => {
  let component: EditSecurityThreatComponent;
  let fixture: ComponentFixture<EditSecurityThreatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSecurityThreatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSecurityThreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
