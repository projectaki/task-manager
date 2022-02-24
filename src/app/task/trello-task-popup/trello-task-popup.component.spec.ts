import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloTaskPopupComponent } from './trello-task-popup.component';

describe('TrelloTaskPopupComponent', () => {
  let component: TrelloTaskPopupComponent;
  let fixture: ComponentFixture<TrelloTaskPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrelloTaskPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrelloTaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
