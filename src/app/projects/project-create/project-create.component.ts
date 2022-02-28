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
  @Input() showModal = false;
  @Input() set isLoading(val: boolean) {
    this._isLoading = val;
  }
  @Output() closed = new EventEmitter();
  @Output() submit = new EventEmitter<Project>();

  private _isLoading = false;
  public get isLoading() {
    return this._isLoading;
  }

  projectCreateForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectCreateForm = fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {}

  onClose() {
    this.closed.emit();
  }

  onSubmit() {
    this.submit.emit({ ...this.projectCreateForm.value, id: '99' });
  }
}
