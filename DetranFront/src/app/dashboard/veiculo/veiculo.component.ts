import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VeiculoService } from 'src/app/shared/veiculo/veiculo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {
  placaBuscar:string = "";
  constructor(public service: VeiculoService,
    public router: Router, 
    public toastr: ToastrService, 
    ) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      vei_n_codigo: 0,
      vei_c_modelo: '',
      vei_c_marca: '',
      vei_c_placa:"",
      vei_c_cor: "",
      vei_c_anoFabricacao:''
    }
  }

  Buscar(){
    this.service.find(this.placaBuscar);
  }

  Limpar(){
    this.resetForm();
    this.placaBuscar = "";
  }

  onDelete() {
    if(confirm("Deseja mesmo deletar este processo?")){
      this.service.delete(this.service.formData.vei_n_codigo).subscribe((res: any) => {
          if(res['status']=='success'){
            this.toastr.show("Deletado","Sucesso!");
            this.toastr.success('Veículo removido com sucesso!', 'Veículo Removido!');
            this.resetForm();
          }
          else{
            this.toastr.error("Erro ao deletar","Erro!");
          }
        },
        err => {
          this.toastr.error(err,"Algo deu errado: ");
        }
      );   
    }    
  }

  onSubmit(form: NgForm) {
    this.service.register().subscribe((res: any) => {

        if(res['status'] == 'success'){
          this.resetForm(form);
          this.toastr.success('Veículo cadastrado com sucesso!', 'Novo veículo adicionado!');
        }
        else if(res['status'] == 'already_registered'){
          this.toastr.warning("Esta placa já esta cadastrada");
        }  
      },

      err => {
        debugger

        this.toastr.error(err,"Algo deu errado:");
      }
    );
  }

}
