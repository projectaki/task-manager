import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss'],
})
export class MemberCreateComponent implements OnInit {
  @Input() showModal = false;
  @Output() closed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closed.emit();
  }
}
