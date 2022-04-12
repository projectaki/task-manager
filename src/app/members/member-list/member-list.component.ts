import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectRole } from 'src/app/core/enums/project-role.enum';
import { Member } from '../member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  @Input() members: Member[] = [];
  @Input() canDelete!: boolean;
  @Input() set isDeleteLoading(val: boolean) {
    this._isDeleteLoading = val;
  }
  @Input() set selectedProjectUserId(val: string) {
    this._selectedProjectUserId = val;
  }

  public get isDeleteLoading() {
    return this._isDeleteLoading;
  }
  public get selectedProjectUserId() {
    return this._selectedProjectUserId;
  }
  private _isDeleteLoading!: boolean;
  private _selectedProjectUserId!: string;

  @Output() deleted = new EventEmitter<any>();

  ProjectRole = ProjectRole;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  onDelete($event: any) {
    this.deleted.emit($event);
  }
}
