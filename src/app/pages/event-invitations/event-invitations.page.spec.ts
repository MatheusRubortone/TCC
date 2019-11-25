import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInvitationsPage } from './event-invitations.page';

describe('EventInvitationsPage', () => {
  let component: EventInvitationsPage;
  let fixture: ComponentFixture<EventInvitationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInvitationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInvitationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
