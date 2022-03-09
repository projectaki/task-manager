import { ProjectRole } from 'src/app/core/enums/project-role.enum';
import { ProjectListItem } from 'src/app/core/models/project-list-item.interface';
import { ProjectUser } from 'src/app/core/models/project-user.interface';
import { FilterProjectRolePipe } from './filter-project-role.pipe';

describe('FilterProjectPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterProjectRolePipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter proper project list items', () => {
    const pipe = new FilterProjectRolePipe();
    const projects: ProjectListItem[] = [
      { id: '1', name: 'a', role: ProjectRole.OWNER },
      { id: '2', name: 'a', role: ProjectRole.CLIENT },
      { id: '3', name: 'a', role: ProjectRole.OWNER },
    ];

    const res = pipe.transform(projects, ProjectRole.OWNER);
    expect(res.length).toBe(2);
    res.forEach(x => expect(x.projectType).toBe(ProjectRole.OWNER));
  });

  it('should filter proper project users', () => {
    const pipe = new FilterProjectRolePipe();
    const projectUsers: ProjectUser[] = [
      {
        id: '1',
        name: 'Akos',
        email: 'a@a.com',
        company: 'HR',
        accepted: true,
        role: ProjectRole.OWNER,
      },
      {
        id: '2',
        name: 'Marysia',
        email: 'a@a.com',
        company: 'JAPAN',
        accepted: false,
        role: ProjectRole.PARTICIPANT,
      },
      {
        id: '3',
        name: 'Jeff',
        email: 'a@a.com',
        company: 'MY HOSUE',
        accepted: true,
        role: ProjectRole.CLIENT,
      },
    ];

    const res = pipe.transform(projectUsers, ProjectRole.OWNER);
    expect(res.length).toBe(1);
    res.forEach(x => expect(x.projectType).toBe(ProjectRole.OWNER));
  });
});
