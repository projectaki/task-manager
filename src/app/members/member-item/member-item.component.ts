import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss'],
})
export class MemberItemComponent implements OnInit {
  @Input() avatarColor: string = '#696969';

  ngOnInit(): void {}
}
