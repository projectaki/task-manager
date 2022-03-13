import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterProjectRolePipe } from 'src/app/shared/pipes/filter-project-role.pipe';
import { LoadingStatePipe } from 'src/app/shared/pipes/loading-state.pipe';
import { FilterCompletedTaskPipe } from '../filter-completed-task.pipe';
import { ProjectuserToMemberPipe } from '../projectuser-to-member.pipe';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectComponent,
        LoadingStatePipe,
        FilterCompletedTaskPipe,
        ProjectuserToMemberPipe,
        FilterProjectRolePipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
