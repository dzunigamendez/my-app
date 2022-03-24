import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { EchoComponent } from './echo/echo.component';
import { EchoInputComponent } from './echo-input/echo-input.component';
import { EchoOutputComponent } from './echo-output/echo-output.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EchoService } from './echo.service';
import { TodoComponent } from './todo/todo.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { FormLabelComponent } from './form-label/form-label.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    EchoComponent,
    EchoInputComponent,
    EchoOutputComponent,
    TodoComponent,
    SignUpComponent,
    FormFieldComponent,
    FormErrorComponent,
    FormLabelComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [EchoService, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
