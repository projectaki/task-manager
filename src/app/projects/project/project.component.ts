import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  obj: { [key: string]: boolean } = {
    showTask: true,
    showHistory: false,
    showMembers: false,
  };

  constructor() {}

  ngOnInit(): void {}

  toggle(key: string) {
    const temp = { ...this.obj };

    for (const k in temp) {
      temp[k] = false;
    }
    temp[key] = true;
    this.obj = temp;
  }
}
