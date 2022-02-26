import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { TabViewComponent } from './tab-view/tab-view.component';
import { DragDropModule } from 'primeng/dragdrop';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [TabViewComponent],
  imports: [
    CommonModule,
    TabViewModule,
    DragDropModule,
    CardModule,
    AvatarModule,
    FlexLayoutModule,
    DividerModule,
    ChipModule,
    ButtonModule,
  ],
  exports: [
    TabViewModule,
    DragDropModule,
    CardModule,
    AvatarModule,
    FlexLayoutModule,
    DividerModule,
    ChipModule,
    ButtonModule,
  ],
})
export class SharedModule {}
