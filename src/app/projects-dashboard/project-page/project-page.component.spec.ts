import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LoadingStatePipe } from 'src/app/shared/pipes/loading-state.pipe';
import { FilterProjectPipe } from '../../shared/pipes/filter-project.pipe';
import { ProjectPageStoreService } from '../project-page-store.service';
import { ProjectPageComponent } from './project-page.component';

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;
  let store: ProjectPageStoreService;
  let msgService: MessageService;
  let confirmService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectPageComponent, FilterProjectPipe, LoadingStatePipe],
      providers: [
        {
          provide: ProjectPageStoreService,
          useValue: {},
        },
        {
          provide: MessageService,
          useValue: {},
        },
        {
          provide: ConfirmationService,
          useValue: {},
        },
      ],
      imports: [],
    }).compileComponents();

    store = TestBed.inject(ProjectPageStoreService);
    msgService = TestBed.inject(MessageService);
    confirmService = TestBed.inject(ConfirmationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Attributes', () => {
    it('should be initialized', () => {
      expect(component.showCreateModal).toBe(false);
      expect(component.showEditModal).toBe(false);
    });
  });

  describe('Modals', () => {
    it('should be toggled', () => {
      const root: HTMLElement = fixture.debugElement.nativeElement;
      const createModalButton: HTMLElement = root.querySelector('#proj-create-button')!;

      expect(component.showCreateModal).toBe(false);
      createModalButton.click();
      expect(component.showCreateModal).toBe(true);
    });
  });
});
