import { Component, Input, OnInit } from '@angular/core';
import { FeatureType, TagOptions } from './tag-options';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() options!: TagOptions;
}
