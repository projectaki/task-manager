import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent implements OnInit {
  @Input() showModal = false;
  @Output() closed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closed.emit();
  }
}
