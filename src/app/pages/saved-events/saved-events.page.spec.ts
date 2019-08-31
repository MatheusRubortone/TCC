import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEventsPage } from './saved-events.page';

describe('SavedEventsPage', () => {
  let component: SavedEventsPage;
  let fixture: ComponentFixture<SavedEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
