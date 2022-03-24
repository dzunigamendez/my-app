import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ValidationErrorService } from '../validation-error.service';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css'],
})
export class FormErrorComponent implements OnInit {
  @Input() name!: string;
  @Input() showDefaultError: boolean = true;
  constructor(
    private formFieldComponent: FormFieldComponent,
    private validationErrorService: ValidationErrorService
  ) {}

  ngOnInit(): void {}

  get formControl(): AbstractControl | null | undefined {
    return this.formFieldComponent.formControl;
  }

  get hasError() {
    if (!this.formControl) {
      return false;
    }
    return this.formControl.hasError(this.name);
  }

  get errorMessage(): string | null {
    if (!this.hasError) {
      return null;
    }
    const errorData = this.formControl?.getError(this.name);
    return this.validationErrorService.getValidationError(this.name, {
      errorData: errorData,
      controlName: this.formFieldComponent.id,
      controlLabel: this.formFieldComponent.label,
    });
  }
}
