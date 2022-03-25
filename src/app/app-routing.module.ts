import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EchoComponent } from './echo/echo.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () =>
      import('./feature/feature.module').then((m) => m.FeatureModule),
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: 'echo',
    component: EchoComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
