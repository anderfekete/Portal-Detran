import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVar } from 'src/global/globalVar';
import { UsuarioData } from './usuario-data.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  formData: UsuarioData = new UsuarioData();


  constructor(public globalVar: GlobalVar,
              public http: HttpClient,) {}

            register() {
              debugger
              return this.http.post(this.globalVar.rootURL + "/usuario/signup", this.formData);
            }//register
}
