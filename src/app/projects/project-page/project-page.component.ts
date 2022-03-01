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
  public showPopup = false;
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
        this.closeModal();
      }
    });

    this.store.errors$
      .pipe(takeUntil(this.unsub$))
      .subscribe(x => this.messageService.add({ severity: 'error', summary: x.message, life: 3000 }));
  }

  handleChange(e: any) {
    this.currentTabIndex = e.index;
  }

  toggleModal() {
    this.showPopup = !this.showPopup;
  }

  closeModal() {
    this.showPopup = false;
  }

  onProjectCreate(project: Project) {
    this.store.addProjectAsync(project);
  }

  onProjectDelete($event: Event, id: string) {
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
    alert('edit modal open');
  }
}
