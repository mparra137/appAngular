import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {

  public textoOndeFica: string = '';

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit(): void {
    //let id = this.route.parent?.snapshot.params['id'];

    this.route.parent?.params.subscribe((parametro: Params) => {
      let id = parametro['id']
      this.ofertasService.getOndeFicaByID(id).then(
        (response: string) => {
          this.textoOndeFica = response
        }
      )
    })

    
  }

}
