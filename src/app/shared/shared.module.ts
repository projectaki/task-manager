import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { TabViewComponent } from './tab-view/tab-view.component';

@NgModule({
  declarations: [
    TabViewComponent
  ],
  imports: [CommonModule, TabViewModule],
  exports: [TabViewModule],
})
export class SharedModule {}
