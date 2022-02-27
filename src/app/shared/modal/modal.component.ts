import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() showPopup = false;

  @Output() closed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closed.emit();
  }
}
