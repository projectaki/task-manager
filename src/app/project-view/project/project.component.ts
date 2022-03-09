import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { LoadingState } from 'src/app/core/enums/loading-state.enum';
import { ProjectRole } from 'src/app/core/enums/project-role.enum';
import { ProjectUser } from 'src/app/core/models/project-user.interface';
import { Member } from 'src/app/members/member';
import { ProjectViewStoreService } from '../project-view-store.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectViewStoreService, ConfirmationService, MessageService],
})
export class ProjectComponent implements OnInit {
  public readonly gridGap = 40;
  public showCreateTaskModal = false;
  public showInviteModal = false;
  public roles: ProjectRole[] = [ProjectRole.CLIENT, ProjectRole.OWNER, ProjectRole.PARTICIPANT];

  public vm$ = this.store.vm$;
  private unsub$ = new Subject<void>();

  ProjectRole = ProjectRole;

  constructor(
    public store: ProjectViewStoreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.store.listProjectUsersAsync('1');
    this.initObservables();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  initObservables() {
    this.store.projectUserInviteLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.openCreateModal(false);
        this.messageService.add({ severity: 'success', summary: 'User invited successfully!', life: 2000 });
      }
    });

    this.store.projectUserRemoveLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.messageService.add({ severity: 'success', summary: 'User deleted successfully!', life: 2000 });
      }
    });

    this.store.errors$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x) this.messageService.add({ severity: 'error', summary: x.message, life: 3000 });
    });
  }

  toggleCreateTaskModal() {
    this.showCreateTaskModal = !this.showCreateTaskModal;
  }

  openCreateModal(val: boolean = true) {
    this.showInviteModal = val;
  }

  onProjectUserInvite(event: { email: string; role: ProjectRole }) {
    this.store.inviteProjectUserAsync({ id: '1', email: event.email, role: event.role });
  }

  onProjectUserDelete($event: any) {
    const event: Event = $event.event;

    this.store.selectProjectUser($event.id);
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to delete this user?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.removeProjectUserAsync({ id: '1', userId: $event.id });
      },
      reject: () => {},
    });
  }
}
