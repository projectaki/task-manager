import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectRole } from 'src/app/core/enums/project-role.enum';
import { ProjectUser } from 'src/app/core/models/project-user.interface';
import { Member } from 'src/app/members/member';
import { ProjectViewStoreService } from '../project-view-store.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectViewStoreService],
})
export class ProjectComponent implements OnInit {
  public readonly gridGap = 40;
  public showCreateTaskModal = false;
  public showInviteModal = false;

  public vm$ = this.store.vm$;

  ProjectRole = ProjectRole;

  constructor(public store: ProjectViewStoreService) {}

  ngOnInit(): void {
    this.store.listProjectUsersAsync('1');
  }

  toggleCreateTaskModal() {
    this.showCreateTaskModal = !this.showCreateTaskModal;
  }

  toggleInviteModal() {
    this.showInviteModal = !this.showInviteModal;
  }
}
