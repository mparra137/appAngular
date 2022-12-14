import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, switchMap, debounceTime, of, distinctUntilChanged, catchError } from 'rxjs';
import { Subject } from 'rxjs';

import 'rxjs/operators'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas!: Observable<Oferta[]>;
  
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000), //executa a ação swicthMap após 1 segundo
      distinctUntilChanged(), // Para fazer pesquisas distinstas
      switchMap((termo: string) => {
        
        if (termo.trim() === ''){
          //retornar um observable de array de ofertas vazio
          return of<Oferta[]>([])        
        }        
        return this.ofertasService.pesquisaOfertas(termo);
    }),catchError((erro) => {      
      return of<Oferta[]>([])        
    }))

    //this.ofertas.subscribe((ofertas: Oferta[]) => {
    //  console.log(ofertas)
    //  this.ofertasSearch = ofertas
    //})
  }

  public pesquisa(termodaBusca: string): void{    
    this.subjectPesquisa.next(termodaBusca); 

  }

  public limparPesquisa(): void{
    this.subjectPesquisa.next('')
  }

}

/*
public pesquisa(termodaBusca: string): void{
    
    this.ofertas = this.ofertasService.pesquisaOfertas(termodaBusca);
    
    this.ofertas.subscribe({
      next: (data: Oferta[]) => {
      //console.log(data)
    },
      error: (erro: any) => console.log('Status do erro:', erro.status),
      complete: () => console.log('Fluxo de eventos completo')
    })

  }
*/
