import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedEventsPage } from './created-events.page';

describe('CreatedEventsPage', () => {
  let component: CreatedEventsPage;
  let fixture: ComponentFixture<CreatedEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
