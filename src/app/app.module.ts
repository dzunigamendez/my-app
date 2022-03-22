import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { EchoComponent } from './echo/echo.component';
import { EchoInputComponent } from './echo-input/echo-input.component';
import { EchoOutputComponent } from './echo-output/echo-output.component';
import { FormsModule } from '@angular/forms';
import { EchoService } from './echo.service';
import { TodoComponent } from './todo/todo.component';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    EchoComponent,
    EchoInputComponent,
    EchoOutputComponent,
    TodoComponent,
    SignUpComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [EchoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
