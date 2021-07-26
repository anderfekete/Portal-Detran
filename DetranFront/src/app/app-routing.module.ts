import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './account/shared/auth.guard';
import { CondutorComponent } from './dashboard/condutor/condutor.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { VeiculoComponent } from './dashboard/veiculo/veiculo.component';
import { VendaComponent } from './dashboard/venda/venda.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'condutor', component: CondutorComponent},
      {path: 'veiculo', component: VeiculoComponent},
      {path: 'venda', component: VendaComponent},

    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'login', component: LoginComponent},
      {path: 'create-account', component: CreateAccountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
