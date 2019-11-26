import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPeoplePage } from './find-people.page';

describe('FindPeoplePage', () => {
  let component: FindPeoplePage;
  let fixture: ComponentFixture<FindPeoplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPeoplePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPeoplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
