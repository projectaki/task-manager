import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectRole } from 'src/app/core/enums/project-role.enum';
import { ProjectUser } from 'src/app/core/models/project-user.interface';
import { Member } from 'src/app/members/member';

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

  ProjectRole = ProjectRole;

  public projectUsers: ProjectUser[] = [
    {
      id: '1',
      name: 'Akos',
      email: 'a@a.com',
      company: 'HR',
      accepted: true,
      role: ProjectRole.OWNER,
    },
    {
      id: '2',
      name: 'Marysia',
      email: 'a@a.com',
      company: 'JAPAN',
      accepted: false,
      role: ProjectRole.PARTICIPANT,
    },
    {
      id: '3',
      name: 'Jeff',
      email: 'a@a.com',
      company: 'MY HOSUE',
      accepted: true,
      role: ProjectRole.CLIENT,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleCreateTaskModal() {
    this.showCreateTaskModal = !this.showCreateTaskModal;
  }

  toggleInviteModal() {
    this.showInviteModal = !this.showInviteModal;
  }
}
