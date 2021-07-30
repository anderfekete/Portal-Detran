import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VeiculoService } from 'src/app/shared/veiculo/veiculo.service';
import { CondutorService } from 'src/app/shared/condutor/condutor.service';
import { CondutorData } from 'src/app/shared/condutor/condutor-data';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {
  placaBuscar = '';
  public Condutores: CondutorData[] | undefined;

  constructor(public service: VeiculoService,
              public router: Router,
              public toastr: ToastrService,
              public condutorService: CondutorService
    ) { }

  ngOnInit(): void {
    this.Limpar();
  }

  resetForm(form?: NgForm): void {
    if (form != null) {
        form.form.reset();
    }
    this.service.formData = {
      id: 0,
      modelo: '',
      marca: '',
      placa: '',
      cor: '',
      anoFabricacao: ''
    };
  }

  Buscar(): void{
    this.service.find(this.placaBuscar).subscribe((res: any) => {
      this.service.formData = res;
      this.BuscarCondutores(this.service.formData.id);
    }, (err: string | undefined) => {
      this.toastr.error('', 'Registro não encontrado!');
    });
  }

  BuscarCondutores(id: number): void{
    this.condutorService.getListByVehicle(id).subscribe((res: any) => {
      this.Condutores = res;
    }, (err: string | undefined) => {
      this.toastr.error('', 'Registro não encontrado!');
    });
  }

  Limpar(): void{
    this.resetForm();
    this.placaBuscar = '';
    this.Condutores = undefined;
  }

  onDelete(): void {
    if (confirm('Deseja mesmo deletar este processo?')){
      this.service.delete(this.service.formData.id).subscribe((res: any) => {
          if (res.status === 'success'){
            this.toastr.show('Deletado', 'Sucesso!' );
            this.toastr.success('Veículo removido com sucesso!', 'Veículo Removido!');
            this.resetForm();
          }
          else{
            this.toastr.error('Erro ao deletar', 'Erro!');
          }
        },
        (        err: string | undefined) => {
          this.toastr.error(err, 'Algo deu errado: ');
        }
      );
    }
  }

  onSubmit(form: NgForm): void {
    this.service.register().subscribe((res: any) => {

        if (res.status === 'success'){
          this.resetForm(form);
          this.toastr.success('Veículo cadastrado com sucesso!', 'Novo veículo adicionado!');
        }
        else if (res.status === 'already_registered'){
          this.toastr.warning('Esta placa já esta cadastrada');
        }
      },
      (       err: string | undefined) => {
        this.toastr.error(err, 'Algo deu errado:');
      }
    );
  }
}
