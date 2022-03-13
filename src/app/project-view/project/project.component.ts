import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { LoadingState } from 'src/app/core/enums/loading-state.enum';
import { ProjectRole } from 'src/app/core/enums/project-role.enum';
import { ProjectTaskItem } from 'src/app/core/models/project-task-item.interface';
import { ProjectMemberStoreService } from '../project-member-store.service';
import { ProjectTaskStoreService } from '../project-task-store.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectMemberStoreService, ProjectTaskStoreService, ConfirmationService, MessageService],
})
export class ProjectComponent implements OnInit {
  public readonly gridGap = 40;
  public showCreateTaskModal = false;
  public showEditTaskModal = false;
  public showInviteModal = false;
  public roles: ProjectRole[] = [ProjectRole.CLIENT, ProjectRole.OWNER, ProjectRole.PARTICIPANT];

  public memberVM$ = this.memberStore.vm$;
  public taskVM$ = this.taskStore.vm$;

  private unsub$ = new Subject<void>();

  ProjectRole = ProjectRole;

  constructor(
    public memberStore: ProjectMemberStoreService,
    public taskStore: ProjectTaskStoreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.memberStore.listProjectUsersAsync('1');
    this.taskStore.listProjectTasksAsync('1');
    this.subscribeToEvents();

    this.taskStore.projectTasks$.subscribe(x => console.log(x));
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  subscribeToEvents() {
    this.subscribeToMemberEvents();
    this.subscribeToTaskEvents();
  }

  subscribeToTaskEvents() {
    this.taskStore.addLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.openCreateTaskModal(false);
        this.messageService.add({ severity: 'success', summary: 'Task added successfully!', life: 2000 });
      }
    });

    this.taskStore.updateLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.openEditTaskModal(false);
        this.messageService.add({ severity: 'success', summary: 'Task updated successfully!', life: 2000 });
      }
    });

    this.taskStore.removeLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.messageService.add({ severity: 'success', summary: 'Task removed successfully!', life: 2000 });
      }
    });

    this.taskStore.errors$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x) this.messageService.add({ severity: 'error', summary: x.message, life: 3000 });
    });
  }

  subscribeToMemberEvents() {
    this.memberStore.projectUserInviteLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.openInviteUserModal(false);
        this.messageService.add({ severity: 'success', summary: 'User invited successfully!', life: 2000 });
      }
    });

    this.memberStore.projectUserRemoveLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.messageService.add({ severity: 'success', summary: 'User deleted successfully!', life: 2000 });
      }
    });

    this.memberStore.errors$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x) this.messageService.add({ severity: 'error', summary: x.message, life: 3000 });
    });
  }

  openCreateTaskModal(val: boolean = true) {
    this.showCreateTaskModal = val;
  }

  openEditTaskModal(val: boolean = true) {
    this.showEditTaskModal = val;
  }

  editEditTaskModal(id: string) {
    this.taskStore.selectProjectTask(id);
    this.openEditTaskModal();
  }

  openInviteUserModal(val: boolean = true) {
    this.showInviteModal = val;
  }

  onProjectUserInvite(event: { email: string; role: ProjectRole }) {
    this.memberStore.inviteProjectUserAsync({ id: '1', email: event.email, role: event.role });
  }

  onProjectUserDelete($event: any) {
    const event: Event = $event.event;

    this.memberStore.selectProjectUser($event.id);
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to delete this user?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.memberStore.removeProjectUserAsync({ id: '1', userId: $event.id });
      },
      reject: () => {},
    });
  }

  onProjectTaskCreate(projectTaskItem: ProjectTaskItem) {
    this.taskStore.addProjectTaskAsync({ id: '1', projectTaskItem });
  }

  onProjectTaskUpdate(projectTaskItem: ProjectTaskItem) {
    this.taskStore.updateProjectTaskAsync({ id: '1', projectTaskItem });
  }

  onProjectTaskDelete($event: any, id: string) {
    this.taskStore.selectProjectTask(id);
    this.confirmationService.confirm({
      target: $event.target!,
      message: 'Are you sure that you want to delete this task?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskStore.removeProjectTaskAsync({ id: '1', projectTaskId: id });
      },
      reject: () => {},
    });
  }
}
