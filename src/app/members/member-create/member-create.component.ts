import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectRole } from 'src/app/core/enums/project-role.enum';
import { CreateModalBase } from 'src/app/core/models/create-modal-base';
import { Member } from '../member';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss'],
})
export class MemberCreateComponent extends CreateModalBase<{ email: string; role: ProjectRole }> {
  @Input() roles: ProjectRole[] = [];

  constructor(private fb: FormBuilder) {
    super();
    this.form = fb.group({
      email: ['', [Validators.email, Validators.required]],
      role: ['', Validators.required],
    });
  }
}
