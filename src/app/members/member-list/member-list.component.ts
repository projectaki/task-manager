import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  colorArray: string[] = [];
  constructor() {
    Array(50)
      .fill(0)
      .forEach(_ => this.colorArray.push(this.generateRandomVibrantColor()));
  }

  ngOnInit(): void {}

  private generateRandomVibrantColor = () => {
    const randomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };
}
