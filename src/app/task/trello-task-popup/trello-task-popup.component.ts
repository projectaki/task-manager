import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-trello-task-popup',
  templateUrl: './trello-task-popup.component.html',
  styleUrls: ['./trello-task-popup.component.scss'],
})
export class TrelloTaskPopupComponent implements OnInit {
  @Input() showPopup = false;

  @Output() closed = new EventEmitter();

  boards = [{ name: 'board1' }, { name: 'board2' }];

  types = [{ name: 'bug' }, { name: 'feature' }];
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closed.emit();
  }
}
