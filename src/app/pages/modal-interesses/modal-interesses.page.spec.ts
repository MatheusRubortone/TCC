import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInteressesPage } from './modal-interesses.page';

describe('ModalInteressesPage', () => {
  let component: ModalInteressesPage;
  let fixture: ComponentFixture<ModalInteressesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInteressesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInteressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
