import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  @Input() members: Member[] = [];

  @Output() deleted = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onDelete(id: string) {
    this.deleted.emit(id);
  }
}
