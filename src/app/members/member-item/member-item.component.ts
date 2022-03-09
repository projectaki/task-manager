import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss'],
})
export class MemberItemComponent implements OnInit {
  @Input() member!: Member;

  @Output() delete = new EventEmitter<any>();

  public initials!: string;
  public avatarColor!: string;

  ngOnInit(): void {
    this.avatarColor = this.generateRandomVibrantColorFromName(this.member.name);
    this.initials = this.member.name[0].toUpperCase();
  }

  onDelete($event: Event, id: string) {
    this.delete.emit({ event: $event, id });
  }

  private generateInitials(name: string) {
    const [firstName, lastName] = name.split(' ');

    return lastName ? `${firstName[0].toUpperCase()}.${lastName[0].toUpperCase()}` : firstName[0].toUpperCase();
  }

  private generateRandomVibrantColorFromName = (name: string) => {
    const sum = [...name].reduce((acc, curr) => (acc += curr.charCodeAt(0)), 0);

    var h = sum % 360;
    var s = 60 + (sum % 40);
    var l = 40 + (sum % 20);
    return `hsl(${h},${s}%,${l}%)`;
  };
}
