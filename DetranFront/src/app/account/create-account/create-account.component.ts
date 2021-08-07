import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/shared/usuario/usuario.service';
import { GlobalVar } from 'src/global/globalVar';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  pwdRepeat:string = "";
  constructor(public service: UsuarioService,
    public router: Router,
    public toastr: ToastrService,
    public global: GlobalVar
    ) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      usu_n_codigo: 0,
      usu_c_nome: '',
      usu_c_email:"",
      usu_c_senha: ""
    }
  }

  onSubmit(form: NgForm) {
    this.service.register().subscribe(
      res => {
        if(res == true){
          this.toastr.warning("Usuário já existe");
        }
        else{
          this.resetForm(form);
          this.toastr.success('Registro realizado com sucesso!', 'Novo usuário criado!');
        }
      },

      err => {
        debugger

        this.toastr.error(err,"Algo deu errado:");
      }
    );
  }



}
