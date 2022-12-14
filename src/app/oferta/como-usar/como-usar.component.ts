import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public textoComoUsar: string = '';

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit(): void {
    //console.log('Como usar id:', this.route.parent?.snapshot.params['id'])
    //let id: number = this.route.parent?.snapshot.params['id']

    this.route.parent?.params.subscribe((parametro: Params) => {
      let id = parametro['id']
      //this.ofertasService.getComoUsarByID(id).then((resposta: string) => { this.textoComoUsar = resposta })
      this.ofertasService.getComoUsarReturnCollection(id).then((resposta: string) => { this.textoComoUsar = resposta});
    })    
  }

}
