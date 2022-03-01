import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../project.interface';

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
  private _isLoading = false;
  public get isLoading() {
    return this._isLoading;
  }
  @Input() showModal = false;
  @Input() set project(val: Project | undefined) {
    this._project = val;
    this.initForm();
  }
  get project() {
    return this._project;
  }
  private _project?: Project;

  @Output() closed = new EventEmitter();
  @Output() submit = new EventEmitter<Project>();

  projectCreateForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectCreateForm = fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.project) {
      this.projectCreateForm.patchValue({
        id: this.project.id,
        name: this.project.name,
        description: this.project.description,
      });
    }
  }

  onClose() {
    this.closed.emit();
  }

  onSubmit() {
    this.submit.emit(this.projectCreateForm.value);
  }
}
