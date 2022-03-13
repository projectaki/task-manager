import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskTag } from 'src/app/core/enums/task-tag.enum';

import { TaskCardComponent } from './task-card.component';

describe('TaskComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.projectTaskItem = {
      id: '1',
      completed: true,
      tag: TaskTag.BUG,
      title: 'test',
    };
    component.options = {
      showDelete: true,
      showEdit: true,
      showView: true,
    };

    component.isDeleteLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
