import { ProjectRole } from '../core/enums/project-role.enum';
import { ProjectUser } from '../core/models/project-user.interface';
import { ProjectuserToMemberPipe } from './projectuser-to-member.pipe';
import { Member } from './../members/member';

describe('ProjectuserToMemberPipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectuserToMemberPipe();
    expect(pipe).toBeTruthy();
  });

  it('create an instance', () => {
    const pipe = new ProjectuserToMemberPipe();
    const projectUsers: ProjectUser[] = [
      {
        id: '1',
        accepted: false,
        company: 'test',
        email: 'test@test.com',
        name: 'test',
        role: ProjectRole.CLIENT,
      },
    ];
    const res = pipe.transform(projectUsers, ProjectRole.OWNER);

    expect(pipe).toBeTruthy();
    expect(res.length).toBe(1);
  });
});
