import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile-flex-grid',
  templateUrl: './tile-flex-grid.component.html',
  styleUrls: ['./tile-flex-grid.component.scss'],
})
export class TileFlexGridComponent {
  @Input() tiles!: any[];
}
