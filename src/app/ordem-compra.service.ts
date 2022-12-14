import { Injectable } from '@angular/core'
import { Pedido } from '../app/shared/pedido.model'
import { HttpClient, HttpResponse} from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'
import { URL_API } from './app.api'
import { Observable } from 'rxjs'

import { map } from 'rxjs'
import { catchError } from 'rxjs'

@Injectable()
export class OrdemCompraService{
    constructor(private http: HttpClient){}

    public efetivarCompra(pedido: Pedido): Observable<number>{

        let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'})

        console.log(pedido)

        return this.http.post(`${URL_API}/pedidos`, JSON.stringify(pedido), {headers}).pipe(map((response: any) => response['id']));
    }
}