import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CondutorService } from 'src/app/shared/condutor/condutor.service';

@Component({
  selector: 'app-condutor',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.css']
})
export class CondutorComponent implements OnInit {
  cpfBuscar:string ="";
  constructor(public service: CondutorService,
    public router: Router, 
    public toastr: ToastrService, ) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      con_n_codigo: 0,
      con_c_nome: '',
      con_c_cpf: '',
      con_c_telefone: '',
      con_c_email:"",
      con_c_cnh: "",
      con_d_nascimento:''
      
    }
  }

  Buscar(){
    this.service.find(this.cpfBuscar).subscribe((res: any) => {
      this.service.formData = res;
    },err => {
      this.toastr.error(err,"Registro não encontrado!");
    })
  }

  Limpar(){
    this.resetForm();
    this.cpfBuscar = "";
  }

  onDelete() {
    if(confirm("Deseja mesmo deletar este processo?")){
      this.service.delete(this.service.formData.con_n_codigo).subscribe((res: any) => {
          if(res['status']=='success'){
            this.toastr.show("Deletado","Sucesso!");
            this.toastr.success('Condutor removido com sucesso!', 'Condutor Removido!');
            this.resetForm();
          }
          else{
            this.toastr.error("Erro ao deletar","Erro!");
          }
        },
        err => {
          this.toastr.error('erro!',"Algo deu errado: ");
        }
      );   
    }    
  }

  onSubmit(form: NgForm) {
    this.service.register().subscribe((res: any) => {

        if(res['status'] == 'success'){
          this.resetForm(form);
          this.toastr.success(res['content']);
        }
        else if(res['status'] == 'already_registered'){
          this.toastr.warning("Este CPF já esta cadastrada");
        }  
      },

      err => {
        debugger

        this.toastr.error(err,"Algo deu errado:");
      }
    );
  }
}

