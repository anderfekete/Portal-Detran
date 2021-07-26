import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalVar } from 'src/global/globalVar';
import { VeiculoData } from '../veiculo/veiculo-data';
import { VendaData } from './venda-data';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  formData: VendaData = new VendaData();

  constructor(public globalVar: GlobalVar, public http: HttpClient) {}
  register(): any {
    return this.http.post(
      this.globalVar.rootURL + '/venda/postVenda',
      this.formData
    );
  }
}
