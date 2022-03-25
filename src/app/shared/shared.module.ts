import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ModalComponent } from './modal/modal.component';
import { CheckTaskMembershipPipe } from './pipes/check-task-membership.pipe';
import { FilterProjectRolePipe } from './pipes/filter-project-role.pipe';
import { LoadingStatePipe } from './pipes/loading-state.pipe';
import { TagComponent } from './tag/tag.component';
import { TileFlexGridComponent } from './tile-flex-grid/tile-flex-grid.component';

@NgModule({
  declarations: [
    ModalComponent,
    LoadingStatePipe,
    TileFlexGridComponent,
    FilterProjectRolePipe,
    TagComponent,
    CheckTaskMembershipPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabViewModule,
    DragDropModule,
    CardModule,
    AvatarModule,
    FlexLayoutModule,
    DividerModule,
    ChipModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    SkeletonModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    DragDropModule,
    CheckboxModule,
    MatIconModule,
  ],
  exports: [
    ReactiveFormsModule,
    TabViewModule,
    DragDropModule,
    CardModule,
    AvatarModule,
    FlexLayoutModule,
    DividerModule,
    ChipModule,
    ButtonModule,
    DialogModule,
    ModalComponent,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    SkeletonModule,
    ProgressSpinnerModule,
    LoadingStatePipe,
    ToastModule,
    ConfirmDialogModule,
    TileFlexGridComponent,
    DragDropModule,
    FilterProjectRolePipe,
    CheckboxModule,
    MatIconModule,
    TagComponent,
    CheckTaskMembershipPipe,
  ],
})
export class SharedModule {}
