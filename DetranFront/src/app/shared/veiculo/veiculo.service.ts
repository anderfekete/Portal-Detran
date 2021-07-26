import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalVar } from 'src/global/globalVar';
import { VeiculoData } from './veiculo-data';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  formData: VeiculoData = new VeiculoData();

  constructor(public globalVar: GlobalVar,
              public http: HttpClient,) { }
  getAll(): Observable<VeiculoData[]> {
    return this.http.get<VeiculoData[]>(this.globalVar.rootURL + '/veiculo/getVeiculos');
  }
  getListByConductor(id: number): Observable<VeiculoData[]> {
    return this.http.get<VeiculoData[]>(this.globalVar.rootURL + '/veiculo/getPorCondutor?id=' + id);
  }
  register(): any {
    return this.http.post(this.globalVar.rootURL + '/veiculo/postVeiculo', this.formData);
  }

  find(placa: string): any {
    return this.http.get(this.globalVar.rootURL + '/veiculo/buscar?placa=' + placa);
  }

  delete(id: number): any{
    return this.http.delete(`${this.globalVar.rootURL}/veiculo/${id}`);
  }
}
