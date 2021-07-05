import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVar } from 'src/global/globalVar';

@Injectable({
  providedIn: 'root'
})
export class CompraVendaService {

  constructor(public globalVar: GlobalVar,
              public http: HttpClient,) { }
}
