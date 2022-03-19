import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ModalComponent } from './modal/modal.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingStatePipe } from './pipes/loading-state.pipe';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TileFlexGridComponent } from './tile-flex-grid/tile-flex-grid.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilterProjectRolePipe } from './pipes/filter-project-role.pipe';
import { CheckboxModule } from 'primeng/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [ModalComponent, LoadingStatePipe, TileFlexGridComponent, FilterProjectRolePipe, TagComponent],
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
  ],
})
export class SharedModule {}
