import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVar } from 'src/global/globalVar';
import { CondutorData } from './condutor-data';

@Injectable({
  providedIn: 'root'
})
export class CondutorService {

  formData: CondutorData = new CondutorData();
  ListByVehicle: CondutorData[] | undefined;


  constructor(public globalVar: GlobalVar, private datePipe: DatePipe,
              public http: HttpClient,) { }
  getAll(): Observable<CondutorData[]> {
    return this.http.get<CondutorData[]>(this.globalVar.rootURL + '/condutor/getCondutor');
  }

  getListByVehicle(id: number): Observable<CondutorData[]> {
    return this.http.get<CondutorData[]>(this.globalVar.rootURL + '/condutor/getPorVeiculo?id=' + id);
  }

  register(): any {
    return this.http.post(this.globalVar.rootURL + '/condutor/postCondutor', this.formData);
  }

  find(cpf: string): any {
    return this.http.get(this.globalVar.rootURL + '/condutor/buscar?cpf=' + cpf);
  }
  delete(id: number): any{
    return this.http.delete(this.globalVar.rootURL + '/condutor/' + id);
  }
}
