import { Injectable } from '@angular/core';

interface ErrorMessages {
  [key: string]: (context: ErrorContext) => string;
}

interface ErrorContext {
  controlName: string;
  controlLabel?: string;
  errorData: any;
}

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {
  messages: ErrorMessages = {
    required: (context) => {
      return `${context.controlLabel || context.controlName} es requerido`;
    },
    email: (context) => {
      return `${context.controlLabel || context.controlName} es inválido`;
    },
    minlength: (context) => {
      return `Debe tener mínimo ${context.errorData['requiredLength']} caracteres`;
    },
    maxlength: (context) => {
      return `Debe tener máximo ${context.errorData['requiredLength']} caracteres`;
    },
  };

  getValidationError(errorName: string, context: ErrorContext): string | null {
    const messageFn = this.messages[errorName];
    if (messageFn) {
      return messageFn(context);
    }
    return null;
  }
}
