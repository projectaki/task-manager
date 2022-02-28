import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  public readonly gridGap = 40;
  public showCreateTaskModal = false;
  public showInviteModal = false;

  constructor() {}

  ngOnInit(): void {}

  toggleCreateTaskModal() {
    this.showCreateTaskModal = !this.showCreateTaskModal;
  }

  toggleInviteModal() {
    this.showInviteModal = !this.showInviteModal;
  }
}
