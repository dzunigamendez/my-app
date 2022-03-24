import {
  Component,
  ContentChild,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  Validators,
} from '@angular/forms';
import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
})
export class FormFieldComponent implements OnInit {
  @Input() id!: string;
  @Input() label!: string;
  @ContentChild(FormLabelComponent) formLabelContent?: FormLabelComponent;

  formControl: AbstractControl | null | undefined = null;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.formControl = this.controlContainer.control?.get(this.id);
  }

  get required(): boolean {
    if (!this.formControl) {
      return false;
    }
    return this.formControl.hasValidator(Validators.required);
  }

  get pending(): boolean {
    if (!this.formControl) {
      return false;
    }
    return this.formControl.pending;
  }
}
