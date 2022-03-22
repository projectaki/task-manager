import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateModalBase } from 'src/app/core/base-classes/create-modal-base.directive';
import { ProjectRole } from 'src/app/core/enums/project-role.enum';
import { MemberCreate } from '../member-create';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss'],
})
export class MemberCreateComponent extends CreateModalBase<MemberCreate> {
  @Input() roles: ProjectRole[] = [];

  constructor(private fb: FormBuilder) {
    super();
    this.form = fb.group({
      email: ['', [Validators.email, Validators.required]],
      role: ['', Validators.required],
    });
  }
}
