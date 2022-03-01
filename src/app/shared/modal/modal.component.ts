import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() showPopup = false;
  @Input() title!: string;

  @Output() closed = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closed.emit();
  }
}
