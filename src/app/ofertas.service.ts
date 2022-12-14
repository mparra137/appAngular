import {HttpClient, HttpResponse} from '@angular/common/http'
import { Injectable } from '@angular/core'
import {Oferta} from './shared/oferta.model' 
import { lastValueFrom } from 'rxjs';

import { URL_API } from './app.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';



@Injectable()
export class OfertasService{

    constructor(private http: HttpClient){}    

    public getOfertas(): Promise<Oferta[]>{        
        
        return lastValueFrom(this.http.get<Oferta[]>(`${URL_API}/ofertas?destaque=true`));

    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]>{
        console.log(categoria)
        let url = `${URL_API}/ofertas?categoria=${categoria}`;
        return lastValueFrom(this.http.get<Oferta[]>(url));
    }

    public getOfertaByID(id: number): Promise<Oferta>{
        let url = `${URL_API}/ofertas/${id}`;
        return lastValueFrom(this.http.get<Oferta>(url))
    }

    //Deste modo abaixo, obtemos o resultado de uma pesquisa porém retornada como array, e pegamos somente a primeira posição do array
    public getOfertaByID2(id: number): Promise<Oferta>{
        let url = `${URL_API}/ofertas?id=${id}`
        return lastValueFrom(this.http.get<Oferta>(url)).then(
            (resposta: any) =>{
                //console.log(resposta)   
                return resposta.shift()
            }
        )
    }

    public getComoUsarByID(id: number) : Promise<string>{
        let url = `${URL_API}/como-usar/${id}`
        return lastValueFrom(this.http.get(url)).then(
            (response: any) => {                 
                return response.descricao }
        );
    }

    public getComoUsarReturnCollection(id: number): Promise<string>{
        let url = `${URL_API}/como-usar/?id=${id}`
        return lastValueFrom(this.http.get<string>(url)).then(
            (response: any) => {
                //console.log(response)
                return response.shift().descricao
            }
        );
    }

    public getOndeFicaByID(id: number): Promise<string>{
        let url = `${URL_API}/onde-fica/${id}`
        return lastValueFrom(this.http.get<string>(url)).then(
            (response: any) => { return response.descricao}
        )
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`).pipe(retry(10), map((resposta: any) => {
            //console.log(resposta)
            return resposta
        }))
    }

    // public getOfertas2(): Promise<Oferta[]>{
    //     return new Promise((resolve, reject) => {

    //         console.log('Promessa de Ofertas')

    //         let deu_certo = true
    //         if (deu_certo){
    //             setTimeout(() =>  resolve(this.ofertas),3000)               
    //         } else {
    //             reject({codigo: 404, mensagem: 'Serviço não encontrado 2'});
    //         }
    //     }).then((offer: Array<Oferta> | any) => {
    //         console.log('Primeiro then')
    //         return offer
    //     }).then((offer: Array<Oferta> | any) => {
    //         console.log('Segundo then')

    //         return new Promise<Array<Oferta>>((resolve2, reject2) => {
    //             setTimeout(() => {
    //                 resolve2(offer)
    //             }, 3000)
    //         })
    //     }).then((ofertas: Array<Oferta>) => {
    //         console.log('Terceiro then executado após aguardar 3 segundos do segundo then')
    //         return ofertas
    //     });
    // }

    
}