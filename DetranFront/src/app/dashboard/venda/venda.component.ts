import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CondutorService } from 'src/app/shared/condutor/condutor.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { VendaService } from 'src/app/shared/venda/venda.service';
import { VeiculoService } from 'src/app/shared/veiculo/veiculo.service';
import { CondutorData } from 'src/app/shared/condutor/condutor-data';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {
  cpfBuscar = '';
  placaBuscar = '';

  constructor(public service: VendaService,
              public condutorService: CondutorService,
              public veiculoService: VeiculoService,
              public router: Router,
              public toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm): any {
    if (form != null) {
      form.form.reset();
      this.veiculoService.formData = {
        id: 0,
        modelo: '',
        marca: '',
        placa: '',
        cor: '',
        anoFabricacao: ''
      };

    }

    this.condutorService.formData = {
      id: 0,
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      cnh: '',
      nascimento: ''
    };

    this.service.formData = {
      Id: 0,
      IdVeiculo: 0,
      IdCondutor: 0
    };
  }

  BuscarCondutor(): void{
    this.condutorService.find(this.cpfBuscar).subscribe((res: any) => {
      this.condutorService.formData = res;
    }, (err: string | undefined) => {
      this.toastr.error(err, 'Condutor não encontrado!');
    });
  }
  BuscarVeiculo(): void{
    this.veiculoService.find(this.placaBuscar).subscribe((res: any) => {
      this.veiculoService.formData = res;
    }, (err: string | undefined) => {
      this.toastr.error(err, 'Registro não encontrado!');
    });
  }

  onSubmit(form: NgForm): void {

    this.service.formData.IdCondutor = this.condutorService.formData.id;
    this.service.formData.IdVeiculo = this.veiculoService.formData.id;

    this.service.register().subscribe((res: any) => {

        if (res.status === 'success'){
          this.resetForm(form);
          this.toastr.success(res.content);
        }
      },

      (      err: string | undefined) => {
        this.toastr.error(err, 'Algo deu errado:');
      }
    );
  }

}
