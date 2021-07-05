import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GlobalVar } from 'src/global/globalVar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CondutorComponent } from './dashboard/condutor/condutor.component';
import { VendaComponent } from './dashboard/venda/venda.component';
import { VeiculoComponent } from './dashboard/veiculo/veiculo.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthInterceptor } from './http-intercept.ts/auth-intercept';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AuthenticationComponent,
    CreateAccountComponent,
    DashboardComponent,
    CondutorComponent,
    VeiculoComponent,
    VendaComponent,
  ],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    MatFormFieldModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxMaskModule.forRoot()
  ],
  providers: [GlobalVar,DatePipe,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true},
  
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
