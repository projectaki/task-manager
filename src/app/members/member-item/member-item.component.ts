import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '../member';
import { MemberItemOptions } from './member-item-options.interface';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss'],
})
export class MemberItemComponent implements OnInit {
  @Input() member!: Member;
  @Input() set isDeleteLoading(val: boolean) {
    this._isDeleteLoading = val;
  }
  public get isDeleteLoading() {
    return this._isDeleteLoading;
  }

  @Input() options!: MemberItemOptions;

  @Output() delete = new EventEmitter<any>();

  public initials!: string;
  public avatarColor!: string;
  private _isDeleteLoading!: boolean;

  ngOnInit(): void {
    this.avatarColor = this.member.name
      ? this.generateRandomVibrantColorFromName(this.member.name)
      : this.generateRandomVibrantColorFromName(this.member.email ?? '');
    this.initials = this.member.name
      ? this.member.name[0].toUpperCase()
      : this.member.email
      ? this.member.email[0].toUpperCase()
      : '';
  }

  onDelete($event: Event, id: string) {
    this.delete.emit({ event: $event, id });
  }

  private generateInitials(name: string) {
    const [firstName, lastName] = name.split(' ');

    return lastName ? `${firstName[0].toUpperCase()}.${lastName[0].toUpperCase()}` : firstName[0].toUpperCase();
  }

  private generateRandomVibrantColorFromName = (name: string) => {
    if (!name) return 'pink';
    const sum = [...name].reduce((acc, curr) => (acc += curr.charCodeAt(0)), 0);

    var h = sum % 360;
    var s = 60 + (sum % 40);
    var l = 40 + (sum % 20);
    return `hsl(${h},${s}%,${l}%)`;
  };
}
