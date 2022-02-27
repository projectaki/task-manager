import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberItemComponent } from './member-item/member-item.component';
import { SharedModule } from '../shared/shared.module';
import { MemberCreateComponent } from './member-create/member-create.component';

@NgModule({
  declarations: [MemberListComponent, MemberItemComponent, MemberCreateComponent],
  imports: [CommonModule, SharedModule],
  exports: [MemberListComponent, MemberCreateComponent],
})
export class MembersModule {}
