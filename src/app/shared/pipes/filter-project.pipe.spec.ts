import { ProjectRole } from 'src/app/core/enums/project-role.enum';
import { FilterProjectRolePipe } from './filter-project-role.pipe';

describe('FilterProjectPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterProjectRolePipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter proper projects', () => {
    const pipe = new FilterProjectRolePipe();
    const projects = [
      { id: '1', name: 'a', projectType: ProjectRole.OWNER },
      { id: '2', name: 'a', projectType: ProjectRole.CLIENT },
      { id: '3', name: 'a', projectType: ProjectRole.OWNER },
    ];

    const res = pipe.transform(projects, ProjectRole.OWNER);
    expect(res.length).toBe(2);
    res.forEach(x => expect(x.projectType).toBe(ProjectRole.OWNER));
  });
});
