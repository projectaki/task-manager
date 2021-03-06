import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingState } from 'src/app/core/enums/loading-state.enum';
import { UserService } from 'src/app/core/services/user.service';
import { ProjectRole } from '../../core/enums/project-role.enum';
import { ProjectListItem } from '../../core/models/project-list-item.interface';
import { ProjectPageStoreService } from '../project-page-store.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  providers: [ProjectPageStoreService, MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  public showCreateModal = false;
  public showEditModal = false;
  public readonly vm$ = this.store.vm$;
  ProjectRole = ProjectRole;

  private unsub$ = new Subject<void>();

  constructor(
    private store: ProjectPageStoreService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
    private test: UserService
  ) {}

  ngOnInit(): void {
    this.store.listOwnedProjectsAsync();
    this.store.listParticipantProjectsAsync();
    this.store.listClientProjectsAsync();
    this.initObservables();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  initObservables() {
    this.store.addLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.openCreateModal(false);
        this.messageService.add({ severity: 'success', summary: 'Project created successfully!', life: 2000 });
      }
    });

    this.store.updateLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.openEditModal(false);
        this.messageService.add({ severity: 'success', summary: 'Project updated successfully!', life: 2000 });
      }
    });

    this.store.removeLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.messageService.add({ severity: 'success', summary: 'Project deleted successfully!', life: 2000 });
      }
    });

    this.store.errors$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x) this.messageService.add({ severity: 'error', summary: x.message, life: 3000 });
    });
  }

  openCreateModal(val: boolean = true) {
    this.showCreateModal = val;
  }

  openEditModal(val: boolean = true) {
    this.showEditModal = val;
  }

  editEditModal(id: string) {
    this.store.selectProject(id);
    this.openEditModal();
  }

  onProjectCreate(project: ProjectListItem) {
    const ownedProject: ProjectListItem = { ...project };
    this.store.addProjectAsync(ownedProject);
  }

  onProjectDelete($event: Event, id: string) {
    this.store.selectProject(id);
    this.confirmationService.confirm({
      target: $event.target!,
      message: 'Are you sure that you want to delete this project?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.removeProjectAsync(id);
      },
      reject: () => {},
    });
  }

  onProjectEdit(project: ProjectListItem) {
    this.store.updateProjectAsync(project);
  }
}
