import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  showPopup = false;
  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.showPopup = !this.showPopup;
  }
}
