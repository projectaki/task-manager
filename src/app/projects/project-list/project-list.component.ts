import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  public currentTabIndex = 0;
  public readonly gridGap = 40;
  public showPopup = false;

  constructor() {}

  ngOnInit(): void {}

  handleChange(e: any) {
    this.currentTabIndex = e.index;
  }

  toggleModal() {
    this.showPopup = !this.showPopup;
  }
}
