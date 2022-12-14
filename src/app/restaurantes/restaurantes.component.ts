import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  public ofertas!: Oferta[];
  public categoria: string = 'restaurante'  

  constructor(private service: OfertasService) { }

  ngOnInit(): void {
    this.service.getOfertasPorCategoria(this.categoria).then(
      (ofertas: Oferta[]) => {
        this.ofertas = ofertas    
      }
    )
  }

}
