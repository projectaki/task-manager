import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectListItem } from '../project-list-item.interface';
import { ProjectType } from '../project-type.enum';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateComponent implements OnInit {
  @Input() set isLoading(val: boolean) {
    this._isLoading = val;
  }
  @Input() showModal = false;
  @Input() set project(val: ProjectListItem | undefined) {
    this._project = val;
    this.initForm();
  }
  @Input() title!: string;

  @Output() closed = new EventEmitter();
  @Output() submitted = new EventEmitter<ProjectListItem>();

  private _isLoading = false;
  public get isLoading() {
    return this._isLoading;
  }
  get project() {
    return this._project;
  }
  private _project?: ProjectListItem;
  projectCreateForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectCreateForm = fb.group({
      id: [''],
      name: ['', Validators.required],
      projectType: [''],
    });
  }

  ngOnInit(): void {}

  initForm() {
    if (this.project) {
      this.projectCreateForm.patchValue({
        id: this.project.id,
        name: this.project.name,
        projectType: this.project.projectType,
      });
    }
  }

  onClose() {
    this.closed.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.emit(this.projectCreateForm.value);
  }
}
