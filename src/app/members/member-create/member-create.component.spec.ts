import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { MemberCreateComponent } from './member-create.component';

describe('MemberCreateComponent', () => {
  let component: MemberCreateComponent;
  let fixture: ComponentFixture<MemberCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberCreateComponent],
      imports: [ReactiveFormsModule, SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
