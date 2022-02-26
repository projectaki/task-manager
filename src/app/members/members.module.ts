import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberItemComponent } from './member-item/member-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MemberListComponent, MemberItemComponent],
  imports: [CommonModule, SharedModule],
  exports: [MemberListComponent],
})
export class MembersModule {}
