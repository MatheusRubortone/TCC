import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFriendListPage } from './chat-friend-list.page';

describe('ChatFriendListPage', () => {
  let component: ChatFriendListPage;
  let fixture: ComponentFixture<ChatFriendListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFriendListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFriendListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
