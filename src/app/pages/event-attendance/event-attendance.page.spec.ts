import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttendancePage } from './event-attendance.page';

describe('EventAttendancePage', () => {
  let component: EventAttendancePage;
  let fixture: ComponentFixture<EventAttendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAttendancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
