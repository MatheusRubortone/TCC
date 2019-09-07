import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDescPage } from './event-desc.page';

describe('EventDescPage', () => {
  let component: EventDescPage;
  let fixture: ComponentFixture<EventDescPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDescPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDescPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
