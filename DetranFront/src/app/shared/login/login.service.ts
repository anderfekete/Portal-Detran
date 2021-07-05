import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVar } from 'src/global/globalVar';
import { LoginData } from './login-data.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  formData: LoginData = new LoginData();


  constructor(public globalVar: GlobalVar,
    public http: HttpClient,) { }

  postLogin() {
    return this.http.post(this.globalVar.rootURL + "/usuario/signin", this.formData, { responseType: 'text' })
  }
}
