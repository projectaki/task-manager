import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class CreateModalBase<T> {
  @Input() set isLoading(val: boolean) {
    this._isLoading = val;
  }
  private _isLoading = false;
  public get isLoading() {
    return this._isLoading;
  }
  @Input() showModal = false;
  @Input() title!: string;
  @Output() closed = new EventEmitter();
  @Output() submitted = new EventEmitter<T>();

  form!: FormGroup;

  onClose() {
    this.closed.emit();
    this.form.reset();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.emit(this.form.value);
  }
}
