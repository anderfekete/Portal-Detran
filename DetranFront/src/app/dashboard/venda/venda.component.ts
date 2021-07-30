import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  idCondutor: number | undefined;

  constructor(public service: VendaService,
              public veiculoService: VeiculoService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public toastr: ToastrService, ) { }

  ngOnInit(): void {
    debugger
    this.idCondutor = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '');

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

    this.service.formData = {
      Id: 0,
      IdVeiculo: 0,
      IdCondutor: 0
    };
  }
  Limpar(): void{
    this.resetForm();
    this.cpfBuscar = '';
    this.veiculoService.formData = {
      id: 0,
      modelo: '',
      marca: '',
      placa: '',
      cor: '',
      anoFabricacao: ''
    };  }

  BuscarVeiculo(): void{
    this.veiculoService.find(this.placaBuscar).subscribe((res: any) => {
      this.veiculoService.formData = res;
    }, (err: string | undefined) => {
      this.toastr.error(err, 'Registro não encontrado!');
    });
  }

  onSubmit(form: NgForm): void {

    // tslint:disable-next-line:radix
    this.service.formData.IdCondutor =  this.idCondutor != null ? this.idCondutor : 0;
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
