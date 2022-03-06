import { FilterProjectPipe } from './filter-project.pipe';
import { ProjectType } from './project-type.enum';

describe('FilterProjectPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter proper projects', () => {
    const pipe = new FilterProjectPipe();
    const projects = [
      { id: '1', name: 'a', projectType: ProjectType.OWNER },
      { id: '2', name: 'a', projectType: ProjectType.CLIENT },
      { id: '3', name: 'a', projectType: ProjectType.OWNER },
    ];

    const res = pipe.transform(projects, ProjectType.OWNER);
    expect(res.length).toBe(2);
    res.forEach(x => expect(x.projectType).toBe(ProjectType.OWNER));
  });
});
