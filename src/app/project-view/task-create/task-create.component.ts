import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit {
  @Input() showModal = false;
  @Output() closed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closed.emit();
  }
}
