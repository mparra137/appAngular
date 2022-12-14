import { Component, OnInit, OnChanges, OnDestroy, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';
import CarrinhoService from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
@Injectable()
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta!: Oferta;

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService, private carrinhoService: CarrinhoService, private router: Router) { }

  ngOnInit(): void {
    //console.log('Id da Rota:', this.route.snapshot.params['id'])    
    //let id: number = this.route.snapshot.params['id']   

    this.route.params.subscribe((parametro: Params) => {
      let id = parametro['id']
      this.ofertasService.getOfertaByID(id).then(
        (response: Oferta) => {        
          this.oferta = response
        }
      )    
    })   

    
    //this.route.params.subscribe(
    //  (parametro) => {
    //    console.log(parametro['id'])
    //  }
    //);
  }

  ngOnDestroy(): void{
  }
  
  public adicionarItemCarrinho(): void{
    this.carrinhoService.incluirItem(this.oferta);
    this.router.navigate(['/ordem-compra'])
  }
}
