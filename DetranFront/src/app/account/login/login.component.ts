import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: LoginService,
    public router: Router, 
    public toastr: ToastrService, 
    ) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      usu_c_email: '',
      usu_c_senha: ''
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.usu_c_senha == "" || this.service.formData.usu_c_email == "") {
      this.toastr.warning("Campos estão vazios!", "Atenção!");
    }
    else {
      this.service.formData.usu_c_email = this.service.formData.usu_c_email.toLowerCase();
      this.service.postLogin().subscribe((res: any) => {
        debugger
        sessionStorage.setItem('token', res);
        sessionStorage.setItem("username", res.userName);
        this.router.navigate(['']);
      },
        err => {
          console.log(err);
          this.toastr.error('Usuário ou senha incorretos.', 'Autenticação falhou.');
        });
    }
  }
}
