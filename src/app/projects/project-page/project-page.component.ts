import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoadingState } from 'src/app/core/models/loading-state.enum';
import { ProjectPageStoreService } from '../project-page-store.service';
import { Project } from '../project.interface';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  providers: [ProjectPageStoreService, MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  public currentTabIndex = 0;
  public readonly gridGap = 40;
  public showCreateModal = false;
  public showEditModal = false;
  public readonly vm$ = this.store.vm$;

  private unsub$ = new Subject<void>();

  constructor(
    private store: ProjectPageStoreService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.store.listProjectsAsync('1');
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
      }
    });

    this.store.updateLoadingState$.pipe(takeUntil(this.unsub$)).subscribe(x => {
      if (x === LoadingState.LOADED) {
        this.openEditModal(false);
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

  onProjectCreate(project: Project) {
    this.store.addProjectAsync(project);
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

  onProjectEdit(project: Project) {
    this.store.updateProjectAsync(project);
  }
}
