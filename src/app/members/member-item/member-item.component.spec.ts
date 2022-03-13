import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberItemComponent } from './member-item.component';

describe('MemberItemComponent', () => {
  let component: MemberItemComponent;
  let fixture: ComponentFixture<MemberItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberItemComponent);
    component = fixture.componentInstance;
    component.member = {
      id: '1',
      accepted: true,
      company: 'test',
      email: 'tesst',
      name: 'test',
    };
    component.avatarColor = '#000000';
    component.isDeleteLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
