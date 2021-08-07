import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CondutorService } from 'src/app/shared/condutor/condutor.service';
import { VeiculoData } from 'src/app/shared/veiculo/veiculo-data';
import { VeiculoService } from 'src/app/shared/veiculo/veiculo.service';

@Component({
  selector: 'app-condutor',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.css']
})
export class CondutorComponent implements OnInit {
  cpfBuscar = '';
  public Veiculos: VeiculoData[] | undefined;

  constructor(public service: CondutorService,
              public veiculoService: VeiculoService,
              public router: Router,
              public toastr: ToastrService,
              private datePipe: DatePipe )
              {
              }

  ngOnInit(): void {
    this.Limpar();
  }

  // tslint:disable-next-line:typedef
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.service.formData = {
      id: 0,
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      cnh: '',
      nascimento: ''
    };
  }

  Buscar(): void{
    this.service.find(this.cpfBuscar).subscribe((res: any) => {
      this.service.formData = res;
      this.service.formData.nascimento = this.datePipe.transform(this.service.formData.nascimento, 'yyyy-MM-dd');
      this.BuscarVeiculos(this.service.formData.id);
    }, (err: string | undefined) => {
      this.toastr.error(err, 'Registro não encontrado!');
    });
  }

  BuscarVeiculos(id: number): void{
    this.veiculoService.getListByConductor(id).subscribe((res: VeiculoData[]) => {
      this.Veiculos = res;
    }, (err: string | undefined) => {
      this.toastr.error(err, 'Erro ao carregar Veículos!');
    });

  }

  Limpar(): void{
    this.resetForm();
    this.cpfBuscar = '';
    this.Veiculos = undefined;
  }

  onDelete(): void {
    if (confirm('Deseja mesmo deletar este processo?')){
      this.service.delete(this.service.formData.id).subscribe((res: any) => {
          if (res.status === 'success'){
            this.toastr.show('Deletado', 'Sucesso!');
            this.toastr.success('Condutor removido com sucesso!', 'Condutor Removido!');
            this.resetForm();
          }
          else{
            this.toastr.error('Erro ao deletar', 'Erro!');
          }
        },
        () => {
          this.toastr.error('erro!', 'Algo deu errado: ');
        }
      );
    }
  }

  onSubmit(form: NgForm): void {

    this.service.register().subscribe((res: any) => {
        if (res.status === 'success'){
          this.resetForm(form);
          this.toastr.success(res.content);
        }
        else if (res.status === 'already_registered'){
          this.toastr.warning('Este CPF já esta cadastrada');
        }
      },

      (      err: string | undefined) => {
        this.toastr.error(err, 'Algo deu errado:');
      }
    );
  }

  calcularIdade(): void{
    debugger
      const hoje = new Date();
      const nascimento = new Date(this.service.formData.nascimento ? this.service.formData.nascimento : '' );

      let diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();

      if ( new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
           new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()) )
          diferencaAnos--;

  }
}

