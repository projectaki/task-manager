import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProjectPageStoreService } from '../project-page-store.service';
import { Project } from '../project.interface';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  providers: [ProjectPageStoreService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  public currentTabIndex = 0;
  public readonly gridGap = 40;
  public showPopup = false;
  public projects$ = this.store.projects$;
  public projectAddLoading = false;

  private unsub$ = new Subject<void>();

  constructor(private store: ProjectPageStoreService) {}

  ngOnInit(): void {
    this.store.getProjectsAsync('1');
    this.initSubscriptions();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  initSubscriptions() {
    this.store.projectAddSuccess$.pipe(takeUntil(this.unsub$)).subscribe(() => {
      this.projectAddLoading = false;
      this.closeModal();
    });
    this.store.projectAddError$.pipe(takeUntil(this.unsub$)).subscribe(() => {
      this.projectAddLoading = false;
      alert('error');
    });
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
    this.projectAddLoading = true;

    this.store.addProjectAsync(project);
  }
}
